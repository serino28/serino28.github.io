---
layout: post
title: "Sparse autoencoder: recuperare feature interpretabili dalla superposition"
description: "Come gli sparse autoencoder scompongono le attivazioni di un modello in un dizionario overcomplete di latenti, e come quei latenti vengono spiegati e valutati dalle attuali pipeline di auto-interpretability."
date: 2024-12-05
tags: [Interpretabilità, SAE]
lang: it
permalink: /it/research/sparse-autoencoders/
alt_url: /research/sparse-autoencoders/
---

Nella [nota precedente]({{ '/it/research/linear-representations-superposition/' | relative_url }})
abbiamo visto perché non si può leggere un modello neurone per neurone. I concetti sono
rappresentati come **direzioni** nello spazio delle attivazioni (la linear representation
hypothesis), e il modello ne immagazzina più delle dimensioni che ha mettendoli in
**superposition**, il che rende i singoli neuroni **polisemantici**. La domanda pratica che
ne segue è come recuperare quelle direzioni. L'approccio dominante oggi è lo **sparse
autoencoder (SAE)**: una piccola rete addestrata a scomporre le attivazioni in un insieme
ampio e sparso di **latenti** che dovrebbero essere **monosemantici**.

Una convenzione di vocabolario che terrò per tutta la nota: un *latente* è un'unità che lo
SAE impara; una *feature* è il concetto sottostante che speriamo catturi. Tenerli distinti
conta, perché non ogni latente si rivela una feature pulita.

## Dictionary learning sulle attivazioni

Uno SAE è un caso di **dictionary learning**. Dato un vettore di attivazione `x` preso da un
punto del modello (tipicamente il **residual stream** a un layer scelto), lo modelliamo come
combinazione lineare sparsa e non negativa di un insieme fisso e **overcomplete** di
direzioni:

```text
x  ≈  f₁·d₁ + f₂·d₂ + … + fₘ·dₘ        con quasi tutti gli fᵢ = 0
```

Le direzioni `dᵢ` formano il **dizionario** (il decoder), e i coefficienti `fᵢ` sono le
**attivazioni dei latenti**. Per un dato input quasi tutti i coefficienti sono zero, quindi
ogni attivazione è spiegata da una manciata di elementi del dizionario. L'ipotesi è che, con
sparsità sufficiente, queste direzioni del dizionario recuperino le feature sottostanti che
la superposition aveva aggrovigliato, là dove nessun singolo neurone lo faceva.

## L'architettura dello sparse autoencoder

Uno SAE è un autoencoder con un unico strato nascosto, largo e sparso. Come mostra la figura,
mappa un'attivazione `x ∈ R^{d_model}` in un dizionario molto più grande `f ∈ R^{d_SAE}`,
dove `d_SAE = F · d_model` e il **fattore di espansione** `F` rende lo strato nascosto
*overcomplete*. Ha due parti:

- **Encoder.** Sottrae un bias, proietta verso lo spazio dei latenti e applica una
  nonlinearità: `f = ReLU(W_enc (x − b_dec) + b_enc)`. Ogni componente di `f` è l'attivazione
  di un latente.
- **Decoder.** Ricostruisce l'attivazione come somma pesata di direzioni del dizionario:
  `x̂ = W_dec · f + b_dec`. Le **righe di `W_dec` sono le direzioni dei latenti** (gli atomi
  del dizionario).

<figure>
  <img src="{{ '/assets/img/posts/sae-architecture.png' | relative_url }}"
       alt="Schema disegnato a mano di uno sparse autoencoder. A sinistra un vettore di attivazione x di dimensione d_model entra in un trapezio 'encoder' che contiene x' = x − b_dec, W_enc·x' + b_enc e una ReLU. Al centro una barra verticale alta etichettata 'spazio latente sparso' di dimensione F·d_model contiene i latenti f. A destra un trapezio 'decoder' con W_dec·f + b_dec ricostruisce il vettore x-hat. Sotto sono scritte due formule: f = ReLU(W_enc(x − b_dec) + b_enc) e x-hat = W_dec·f + b_dec.">
  <figcaption>L'encoder mappa un'attivazione <code>d_model</code> in uno spazio di latenti overcomplete di dimensione <code>d_SAE = F · d_model</code>; il decoder la ricostruisce come somma pesata sparsa di direzioni del dizionario. (Da Cunningham et&nbsp;al., <em>Sparse Autoencoders Find Highly Interpretable Features in Language Models</em>, EleutherAI.)</figcaption>
</figure>

Il dizionario è deliberatamente overcomplete: la superposition aveva stipato molti concetti
in pochi neuroni, quindi per disfarla lo spazio dei latenti ha bisogno di più slot di quanti
ne avesse il modello, con spazio perché ogni concetto si prenda il suo.

## L'obiettivo di addestramento: ricostruzione e sparsità

Uno SAE è addestrato sulle attivazioni del modello stesso con una loss composta da due
termini in competizione: un termine di **ricostruzione**, l'errore quadratico `‖x − x̂‖²`, e
un termine di **sparsità** che spinge il vettore dei latenti verso lo zero. Nella formulazione
originale il termine di sparsità è una **penalità L1** `λ‖f‖₁`, e `λ` regola il compromesso.

Siccome i due termini tirano in direzioni opposte, uno SAE non si giudica mai a un singolo
punto di lavoro. Si valuta lungo la **frontiera di Pareto ricostruzione-sparsità**, bilanciando
la fedeltà di ricostruzione (spesso riportata come frazione della loss del modello recuperata
quando si reinserisce `x̂`, oppure come varianza spiegata) contro la sparsità (il numero medio
di latenti attivi per input, l'**L0**). Lo scopo della pressione di sparsità è la
**monosemanticità**: costringere ogni input a essere spiegato da pochi latenti tende ad
allineare quei latenti a singoli concetti nominabili, invece che alle miscele aggrovigliate
che portano i neuroni.

## Modalità di fallimento dello sparse autoencoder L1

Lo SAE L1 di base ha due problemi ben documentati.

**Activation shrinkage (feature suppression).** La penalità L1 agisce sulla *magnitudo* dei
latenti, non solo sul fatto che siano attivi, quindi minimizzarla distorce sistematicamente
verso il basso le attivazioni dei latenti. L'encoder impara a sottostimare quanto forte spari
un latente, il che peggiora la ricostruzione e distorce proprio le quantità che vogliamo
leggere.

**Dead latents.** Durante l'addestramento molti latenti smettono del tutto di attivarsi e non
tornano più, sprecando capacità del dizionario.

Gran parte delle architetture recenti affronta direttamente questi problemi:

- I **Gated SAE** (Rajamanoharan et al., 2024) separano la decisione su *quali* latenti sono
  attivi dalla stima di *quanto* lo sono, disaccoppiando la pressione L1 dalle magnitudo e
  riducendo lo shrinkage.
- I **TopK SAE** (Gao et al., 2024) sostituiscono la penalità L1 con un vincolo rigido che
  tiene solo le `K` attivazioni di latenti più grandi per input, rendendo la sparsità esatta
  ed eliminando per costruzione il bias di shrinkage.
- I **JumpReLU SAE** (Rajamanoharan et al., 2024) usano una soglia appresa per latente: un
  latente non contribuisce nulla finché non la supera, poi passa a piena intensità,
  migliorando la frontiera ricostruzione-sparsità.

L'obiettivo comune è un dizionario che sia sparso e fedele allo stesso tempo.

## Due usi di un latente: interpretazione e intervento

Una volta addestrato, un latente supporta due operazioni complementari.

**Interpretazione (lettura).** Codifica un'attivazione e guarda quali latenti sono attivi.
Poiché il codice è sparso, sparano solo pochi latenti, e quelli sono l'interpretazione di
quell'attivazione. La figura qui sotto codifica l'attivazione del residual stream di GPT-2 al
layer 11 per un prompt breve; un solo latente (indice 10335) si attiva, e i suoi
max-activating examples mostrano che traccia i riferimenti alle donne e ai loro diritti. Qui
il decoder non serve nemmeno: i latenti attivi sono la lettura.

<figure>
  <img src="{{ '/assets/img/posts/sae-interpret.png' | relative_url }}"
       alt="Diagramma disegnato a mano intitolato 'Interpretare un LLM'. Il prompt 'I hate women' produce un'attivazione x di GPT-2 al layer 11, che viene data in pasto a un encoder. L'output è un vettore sparso alto, quasi tutto zeri, con una cella evidenziata in rosso. Una freccia da quella cella, etichettata 'cella 10335', punta al testo 'references to women and their rights or issues'. Il decoder è abbozzato ma non usato.">
  <figcaption>Interpretazione: codifica un'attivazione e fermati allo strato dei latenti. Per questo prompt si attiva il latente 10335, e i suoi max-activating examples tracciano i riferimenti alle donne e ai loro diritti. Il decoder è disegnato ma inutilizzato.</figcaption>
</figure>

**Intervento (steering).** Ogni latente possiede anche una **direzione del decoder**, il
vettore che riscrive nel residual stream quando si attiva, e questo rende i latenti delle
maniglie causali. Aggiungere la direzione del decoder di un latente ne amplifica il concetto;
**azzerarla** con un'**ablation** (forzando il latente a zero, o sottraendone la direzione) lo
rimuove. È la base del **feature steering**, un'alternativa più mirata rispetto allo steering
con differenze di attivazione grezze. La figura successiva prende il latente 11149, ne legge la
riga dalla matrice del decoder, e recupera una direzione associata a termini legati all'hate
speech, esattamente il tipo di direzione che si azzererebbe per sopprimere quel comportamento.
È qui che riprende il filo sulla sicurezza della
[prima nota]({{ '/it/research/linear-representations-superposition/' | relative_url }}): se un
concetto non sicuro è una direzione recuperabile, è anche una direzione su cui intervenire.

<figure>
  <img src="{{ '/assets/img/posts/sae-decoder-direction.png' | relative_url }}"
       alt="Diagramma disegnato a mano. Lo stesso prompt 'I hate women' viene codificato in un vettore sparso con una cella evidenziata. Una freccia etichettata 'cella 11149' conduce alla matrice del decoder, disegnata come una griglia m per m; la riga 11149 viene estratta come una barra orizzontale. Una seconda freccia da quella riga punta al testo 'terms and phrases related to hate speech and hate crimes'.">
  <figcaption>Intervento: scegli un latente nello strato sparso e leggine la riga dalla matrice del decoder <code>W_dec</code>; quella riga è la direzione che il latente riscrive nel residual stream. Qui il latente 11149 recupera una direzione per termini legati all'hate speech, una direzione che puoi amplificare o azzerare per fare steering del modello.</figcaption>
</figure>

## Auto-interpretability: generare le spiegazioni

Un buon SAE produce decine di migliaia di latenti, troppi per etichettarli a mano, quindi le
spiegazioni si generano in automatico. La pipeline standard di **auto-interpretability**
(introdotta per i singoli neuroni da Bills et al., 2023, e oggi eseguita su larga scala sui
latenti degli SAE da iniziative come l'auto-interp di EleutherAI e Neuronpedia) ha due fasi.

1. **Raccolta degli activating examples.** Si fa passare un grande corpus di testo nel modello
   e nello SAE, e per ogni latente si registrano i contesti in cui spara, conservando i valori
   di attivazione token per token. In pratica si raccolgono i **max-activating examples** e si
   campiona anche da quantili di attivazione più bassi, così la spiegazione non è distorta dai
   soli casi estremi.
2. **Generazione della spiegazione.** Si passano questi contesti, con i token attivanti e le
   loro intensità evidenziati, a un **explainer model** (un LLM capace), chiedendogli di
   descrivere in linguaggio naturale a cosa risponde il latente, per esempio *"si attiva sui
   riferimenti alle donne e ai loro diritti."* L'output è un'ipotesi breve e leggibile sulla
   selettività del latente.

## Valutare le spiegazioni: simulazione, detection e allineamento

Una spiegazione è solo un'ipotesi, e una ben formulata può essere sbagliata, quindi va
**valutata** contro il comportamento reale del latente. Ci sono tre grandi famiglie.

**Simulation scoring** (Bills et al., 2023). Un **simulator model** separato riceve solo la
spiegazione e deve predire l'attivazione del latente su ogni token di un testo tenuto da parte.
Il punteggio è la correlazione tra i profili di attivazione predetti e quelli veri. È la misura
più fedele, e anche la più costosa, perché richiede predizioni token per token su molti
contesti per ogni latente.

**Detection scoring** (Paulo et al., 2024). Invece di riprodurre l'intero profilo di
attivazione, al simulator si dà la spiegazione insieme a un mix bilanciato di contesti attivanti
e non attivanti, e gli si chiede di classificare su quali il latente spara. Valutare per
accuratezza di detection (o AUC) è molto più economico della simulazione completa e scala a
milioni di latenti; una variante di **fuzzing** chiede invece al modello di giudicare se i token
evidenziati sono quelli giusti.

**Intervention scoring.** Un controllo causale più severo: usa la spiegazione per predire
l'effetto dello steering o dell'ablation del latente, e verifica che il cambiamento di
comportamento corrisponda alla predizione.

Tutte e tre rieseguono un modello per ogni spiegazione. **SFAL** (*Semantic-Functional Alignment
Scores*, EMNLP 2025) prende una strada diversa: invece di simulare il comportamento, confronta la
**semantica** della spiegazione con la **funzione** del latente (riassunta dai suoi activating
examples) tramite similarità basata su embedding, ottenendo un segnale rapido, scalabile e
distribuzionale di quanto una spiegazione rispecchi ciò che il latente fa. L'inquadramento è
l'interpretability applicata ai propri output: valutare le spiegazioni invece di fidarsene.

## Limiti: faithfulness, feature splitting e absorption

Gli SAE sono lo stato dell'arte attuale, non un problema risolto, e diverse modalità di
fallimento sono ormai ben comprese.

- **La ricostruzione non è il calcolo.** Un dizionario può ricostruire le attivazioni con
  precisione e ciononostante descrivere male come il modello le usa; un errore di ricostruzione
  basso non implica rilevanza causale.
- **Feature splitting.** Man mano che il dizionario cresce, un singolo concetto può
  frammentarsi su molti latenti quasi-duplicati, così una feature è spalmata invece che catturata
  una volta sola.
- **Feature absorption** (Chanin et al., 2024). Un latente ampio può assorbire silenziosamente uno
  più specifico, così un latente smette di sparare su casi che la sua spiegazione copre
  chiaramente. Questo gonfia l'interpretabilità apparente mentre la rompe.
- **Composizione e latenti non monosemantici.** Alcuni latenti restano miscele, altri hanno senso
  solo in combinazione con altri.

È esattamente per questo che lo scoring e la valutazione devono crescere di pari passo con i
dizionari: una spiegazione che sembra significativa è un punto di partenza, non una conclusione.

## In sintesi

La superposition aggroviglia le feature su neuroni polisemantici. Uno sparse autoencoder le
recupera imparando un **dizionario** overcomplete e scomponendo ogni attivazione in un insieme
sparso di **latenti**, bilanciando ricostruzione e sparsità per spingere quei latenti verso la
**monosemanticità**. L'obiettivo L1 originale causa **activation shrinkage** e **dead latents**,
che le varianti **Gated**, **TopK** e **JumpReLU** correggono. Ogni latente si può **leggere**
(quali latenti sono attivi) e **usare** come direzione causale (steering e ablation). Poiché un
buon dizionario produce troppi latenti per etichettarli a mano, l'**auto-interpretability** genera
le spiegazioni dai max-activating examples, e i metodi di scoring (**simulation**, **detection**,
**intervention**, e approcci basati su embedding come [**SFAL**]({{ '/#publications' | relative_url }}))
misurano se quelle spiegazioni corrispondono davvero al comportamento dei latenti, perché una
spiegazione plausibile non è ancora una spiegazione corretta.
