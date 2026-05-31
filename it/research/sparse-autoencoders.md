---
layout: post
title: "Districare la superposition: guida pratica agli sparse autoencoder"
description: "Come gli sparse autoencoder trasformano le attivazioni aggrovigliate e polisemantiche di un modello in un lungo dizionario di feature che puoi leggere, nominare e usare per fare steering."
date: 2024-12-05
tags: [Interpretabilità, SAE]
lang: it
permalink: /it/research/sparse-autoencoders/
alt_url: /research/sparse-autoencoders/
---

Nella [nota precedente]({{ '/it/research/linear-representations-superposition/' | relative_url }})
ci eravamo lasciati con un problema. I concetti vivono come **direzioni** nello spazio
delle attivazioni, ma il modello ne stipa molti più delle dimensioni che ha (la
superposition), così si spalmano sui neuroni e ogni singolo neurone si accende per un
guazzabuglio privo di senso di cose non correlate (la polisemanticità). Fissare i neuroni
non dice quasi nulla.

Da qui la domanda di questa nota: se i concetti puliti sono ancora lì dentro,
aggrovigliati e sovrapposti, **come li tiriamo fuori?** La risposta migliore che abbiamo
oggi è una rete neurale sorprendentemente piccola, lo **sparse autoencoder (SAE)**.

## Un dizionario, non un microscopio

Il trucco è smettere di *ispezionare* l'attivazione e iniziare a *ri-descriverla*. Prendi
un singolo vettore di attivazione e prova a scriverlo come somma di pochi mattoncini presi
da un insieme grande e fisso:

```text
attivazione  ≈  0.9 · "francese"  +  0.4 · "parla di soldi"  +  0.2 · "tono formale"
```

Quell'insieme di mattoncini è un **dizionario**, e ogni voce è una candidata concept
direction. Questo è il *dictionary learning*: spiegare ogni vettore come combinazione
sparsa di atomi del dizionario. La speranza è che gli atomi si allineino a feature dotate
di significato per noi, là dove i neuroni grezzi non lo facevano mai. Uno SAE è
semplicemente la macchina che impara questo dizionario.

## L'architettura è quasi imbarazzantemente semplice

Uno SAE è un autoencoder con un unico strato nascosto, largo e sparso. Come mostra la
figura, il compito è mappare un'attivazione `x ∈ R^{d_model}` in un dizionario molto più
grande `f ∈ R^{d_SAE}`, dove `d_SAE = F · d_model` e il **fattore di espansione** `F` è ciò
che rende lo strato nascosto *overcomplete*. Fa due cose:

- **Encode.** Sottrae un bias, proietta verso lo spazio delle feature e tiene solo la parte
  positiva: `f = ReLU(W_enc (x − b_dec) + b_enc)`. Ogni componente di `f` dice "quanto sta
  sparando la feature *i*".
- **Decode.** Ricostruisce l'attivazione originale a partire da quelle feature:
  `x̂ = W_dec · f + b_dec`. Le **righe di `W_dec` sono le direzioni delle feature** stesse,
  e la ricostruzione è solo una somma pesata di quelle attive.

<figure>
  <img src="{{ '/assets/img/posts/sae-architecture.png' | relative_url }}"
       alt="Schema disegnato a mano di uno sparse autoencoder. A sinistra un vettore di attivazione x di dimensione d_model entra in un trapezio 'encoder' che contiene x' = x − b_dec, W_enc·x' + b_enc e una ReLU. Al centro una barra verticale alta etichettata 'spazio latente sparso' di dimensione F·d_model contiene le feature f. A destra un trapezio 'decoder' con W_dec·f + b_dec ricostruisce il vettore x-hat. Sotto sono scritte due formule: f = ReLU(W_enc(x − b_dec) + b_enc) e x-hat = W_dec·f + b_dec.">
  <figcaption>Tutta la macchina, da sinistra a destra: un'attivazione di dimensione <code>d_model</code> viene codificata (sottrai <code>b_dec</code>, moltiplica per <code>W_enc</code>, ReLU) in un dizionario alto e sparso di dimensione <code>d_SAE = F · d_model</code>, poi decodificata indietro in una ricostruzione. La larghezza dà risoluzione; la sparsità dà significato. (Da Cunningham et&nbsp;al., <em>Sparse Autoencoders Find Interpretable Features in Language Models</em>, EleutherAI.)</figcaption>
</figure>

Perché renderlo overcomplete? La superposition aveva stipato molti concetti in pochi
neuroni, quindi per disfarla ci servono *più* slot di quanti ne avesse il modello, con
spazio perché ogni concetto si prenda il suo.

## La sparsità è tutto il trucco

Uno strato nascosto largo, da solo, imparerebbe solo una copia pigra dell'input. La magia
sta nell'obiettivo di addestramento, che tira in due direzioni contemporaneamente:
**ricostruire bene** (la `x̂` ricostruita deve assomigliare a `x`, un classico termine di
errore quadratico) e **usare poche feature** (quasi tutte le componenti di `f` devono
essere zero su un dato input, una penalità di sparsità, classicamente un termine L1 su `f`).

È quel secondo termine a fare il lavoro vero. Costringere lo SAE a spiegare ogni input con
solo una manciata di feature attive rispecchia il fatto silenzioso che ha reso possibile la
superposition in primo luogo: in ogni istante **quasi tutti i concetti sono assenti**. Un
dizionario che rispetta questo principio tende a scoprire feature *monosemantiche*,
ciascuna accesa per una singola cosa nominabile invece che per il calderone di un neurone.

## Dove la ricetta semplice fa acqua

La ricetta L1 funziona, ma ha un difetto ben noto. La penalità colpisce la *magnitudo*, non
solo la *presenza*, così lo SAE impara a sottostimare quanto una feature sia davvero accesa,
solo per tenere bassa la penalità. Questo **activation shrinkage** distorce le feature e
peggiora la ricostruzione. Un secondo problema sono le **dead feature**: latenti che, una
volta smesso di attivarsi durante l'addestramento, non tornano più.

Gran parte dei progressi recenti riguarda esattamente la correzione di questo:

- I **Gated SAE** separano la decisione *se* una feature è accesa da *quanto* lo è, così la
  pressione di sparsità smette di trascinare giù le magnitudo.
- I **TopK SAE** eliminano del tutto il termine L1 e tengono invece solo le *K* attivazioni
  di feature più grandi per input. La sparsità diventa un vincolo esatto invece di una
  spinta morbida, aggirando lo shrinkage.
- Il **JumpReLU** usa una soglia appresa: una feature non contribuisce nulla finché non la
  supera, poi passa a piena intensità.

Il filo conduttore: più riesci a imporre in modo pulito "poche feature, a magnitudo oneste",
più il dizionario è affidabile.

## Due cose che puoi fare con una feature

Una volta addestrato lo SAE, ogni feature è insieme qualcosa che puoi *leggere* e una
direzione che puoi *usare*.

**Leggerla.** Fai passare un input nel modello, prendi l'attivazione e codificala. Allo
strato sparso si accendono solo una manciata di feature, e *quelle* sono la tua
interpretazione. Nella figura qui sotto prendiamo l'attivazione di GPT-2 al layer 11 per un
prompt breve e volutamente sgradevole, la codifichiamo e ci fermiamo allo strato sparso: un
solo latente, la cella 10335, si illumina, e si scopre che traccia i riferimenti alle donne
e ai loro diritti. Il decoder non lo eseguiamo nemmeno. Le feature attive *sono* la lettura.

<figure>
  <img src="{{ '/assets/img/posts/sae-interpret.png' | relative_url }}"
       alt="Diagramma disegnato a mano intitolato 'Interpretare un LLM'. Il prompt 'I hate women' produce un'attivazione x di GPT-2 al layer 11, che viene data in pasto a un encoder. L'output è un vettore sparso alto, quasi tutto zeri, con una cella evidenziata in rosso. Una freccia da quella cella, etichettata 'cella 10335', punta al testo 'references to women and their rights or issues'. Il decoder è abbozzato ma non usato.">
  <figcaption>Interpretazione: codifica un'attivazione e fermati allo strato sparso. Per questo prompt si attiva la feature 10335, un latente che traccia i riferimenti alle donne e ai loro diritti. Il decoder è disegnato ma inutilizzato: la feature attiva è tutta la risposta.</figcaption>
</figure>

**Usarne la direzione.** Ogni feature possiede anche una direzione nella matrice del
decoder, il vettore che riscrive nel modello quando si attiva. Scegli una feature, entra
nella sua riga di `W_dec`, e puoi leggere, amplificare o azzerare il concetto che porta.
Nella figura successiva prendiamo un latente diverso, la feature 11149, ne estraiamo la riga
dalla matrice del decoder e recuperiamo una direzione che sta per termini e frasi legate a
hate speech e crimini d'odio. Quella direzione del decoder è la maniglia che afferri quando
vuoi *fare steering* del comportamento invece di limitarti a osservarlo, ed è esattamente il
punto in cui riprende il filo sulla sicurezza della
[prima nota]({{ '/it/research/linear-representations-superposition/' | relative_url }}).

<figure>
  <img src="{{ '/assets/img/posts/sae-decoder-direction.png' | relative_url }}"
       alt="Diagramma disegnato a mano. Lo stesso prompt 'I hate women' viene codificato in un vettore sparso con una cella evidenziata. Una freccia etichettata 'cella 11149' conduce alla matrice del decoder, disegnata come una griglia m per m; la riga 11149 viene estratta come una barra orizzontale. Una seconda freccia da quella riga punta al testo 'terms and phrases related to hate speech and hate crimes'.">
  <figcaption>Controllo: scegli una feature nello strato sparso ed entra nella matrice del decoder <code>W_dec</code>; la sua riga è la direzione latente ricostruita che la feature riscrive. Qui la feature 11149 recupera una direzione per termini legati all'hate speech, il tipo di direzione che puoi amplificare o azzerare per fare steering del modello.</figcaption>
</figure>

## Lo SAE ti consegna 16.000 feature. E adesso?

Leggere una feature a mano è facile. Un buon SAE te ne lascia *decine di migliaia* e nessuna
etichetta, e leggerle a mano non scala. Quindi la mossa standard è l'**auto-interpretability**:
mostri a un modello linguistico gli input che fanno sparare una feature più forte e gli
chiedi di scriverne una breve descrizione ("riferimenti alle donne e ai loro diritti",
"spara sul colore verde"). Economico, veloce, e facilissimo da *sopravvalutare*.

## Come si dà un voto a una spiegazione?

È la domanda in cui vive il mio lavoro. Un'etichetta generata in automatico può suonare
perfettamente sensata ed essere comunque sbagliata. Il modo standard per verificarla è lo
**scoring basato su simulazione**: dai la spiegazione a un modello, gli fai predire quando
la feature dovrebbe sparare, e vedi quanto combacia con la realtà. È fedele ma costoso,
perché ogni spiegazione richiede un nuovo giro di chiamate al modello.

In **SFAL** (*Semantic-Functional Alignment Scores*, EMNLP 2025) prendiamo una strada più
economica. Invece di simulare il comportamento, ci chiediamo se la *semantica* di una
spiegazione si allinea con la *funzione* della feature, confrontandole con una similarità
basata su embedding. Il risultato è un segnale rapido e scalabile su quanto un'etichetta
automatica rispecchi davvero ciò che la feature fa. È l'interpretability rivolta su sé
stessa: interpretare gli interpreti.

## Una dose necessaria di dubbio

Gli SAE sono il miglior strumento che abbiamo, non un problema risolto. Un dizionario può
ricostruire benissimo e ciononostante ingannare: le feature si **spezzano** (un concetto
spalmato su molti latenti quasi-duplicati) o si **compongono** in modi che non corrispondono
a come il modello le usa davvero, e ricostruire un'attivazione non è la stessa cosa che
catturare il calcolo che l'ha prodotta. È per questo che la valutazione deve crescere di
pari passo con i metodi, e perché "la feature sembra significativa" non può mai essere la
fine della frase.

## La versione in un paragrafo

La superposition lascia i concetti aggrovigliati su neuroni polisemantici. Uno **sparse
autoencoder** li districa ri-descrivendo ogni attivazione come combinazione sparsa di un
**dizionario** overcomplete di direzioni apprese, bilanciando ricostruzione e sparsità in
modo che le feature emergano **monosemantiche**. La classica penalità L1 causa shrinkage,
che le varianti più recenti (Gated, TopK, JumpReLU) ripuliscono. Ogni feature è poi
qualcosa che puoi **leggere** (quali latenti si accendono) e una **direzione** del decoder
che puoi usare per fare **steering**, mentre l'**auto-interpretability** le nomina su larga
scala e lavori come [SFAL]({{ '/#publications' | relative_url }}) ne valutano i nomi, perché
una spiegazione plausibile non è ancora una spiegazione corretta.
