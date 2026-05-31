---
layout: post
title: "Perché non puoi leggere un modello fissando i neuroni"
description: "Una guida accessibile alla linear representation hypothesis, alla superposition e alla polisemanticità: perché i concetti vivono come direzioni, non come neuroni."
date: 2024-10-15
tags: [Interpretabilità, Fondamenti]
lang: it
permalink: /it/research/linear-representations-superposition/
alt_url: /research/linear-representations-superposition/
---

Immagina di poter congelare un modello linguistico a metà di un pensiero e ispezionarlo
neurone per neurone, come si leggono le lancette di un quadro di controllo. Ne indichi
uno e chiedi: *cosa misura questo?* La speranza istintiva è che ogni neurone abbia un
compito preciso: questo riconosce il francese, quello segue il sarcasmo, un altro si
accende per il codice.

Sarebbe meraviglioso. Ed è anche, in larga parte, sbagliato. Questa nota parla proprio
del *perché*, e delle tre idee che servono per capire come i modelli immagazzinano
davvero ciò che sanno: la **linear representation hypothesis**, la **superposition** e
la **polisemanticità**.

## I concetti sono direzioni, non lancette

Partiamo da un'idea più pulita del classico "un neurone, un concetto". Immagina lo stato
interno del modello, a un certo layer, come una **freccia** sospesa in uno spazio a
dimensionalità altissima: migliaia di dimensioni invece delle tre che riusciamo a
visualizzare. Ogni volta che il modello elabora del testo, quella freccia punta in una
direzione precisa.

La **linear representation hypothesis** dice che i concetti dotati di significato
corrispondono a particolari *direzioni* in quello spazio. "Questo testo è in francese" è
una direzione. "Questa frase parla di soldi" è un'altra. Per capire se il modello sta
rappresentando qualcosa in questo momento non leggi un singolo neurone: misuri **quanto
la freccia è inclinata lungo la direzione di quel concetto**.

<figure>
  <img src="{{ '/assets/img/posts/linearity-word2vec.png' | relative_url }}"
       alt="Diagramma vettoriale disegnato a mano con le parole king, queen, man e woman, disposte in modo che lo spostamento da man a king corrisponda a quello da woman a queen.">
  <figcaption>La classica analogia di word2vec: <em>king − man + woman ≈ queen</em>. Le relazioni semantiche emergono come spostamenti in linea retta nello spazio, il primo indizio che il significato è immagazzinato in modo <em>lineare</em>. (Mikolov et&nbsp;al., 2013; Park et&nbsp;al., 2024.)</figcaption>
</figure>

> Pensa a un accordo musicale. Il suono che senti è una cosa sola, una singola forma
> d'onda, ma è fatto di più note suonate insieme. Un orecchio allenato sa isolare ogni
> nota. Lo stato interno del modello è l'accordo; i concetti sono le note;
> l'interpretability è imparare a sentirle una alla volta.

<figure>
  <img src="{{ '/assets/img/posts/feature-as-direction.png' | relative_url }}"
       alt="Assi 3D disegnati a mano ed etichettati neuron 1, 2 e 3, con una freccia rossa 'concept direction' che mescola tutti e tre gli assi invece di allinearsi a uno solo.">
  <figcaption>Una feature non è un neurone. È una singola <em>direzione</em>, un vettore unitario costruito a partire da molti neuroni insieme, che punta con la sua angolazione attraverso lo spazio delle attivazioni. (A Mathematical Framework for Transformer Circuits, Anthropic.)</figcaption>
</figure>

Perché tutto questo conta così tanto? Perché se i concetti sono direzioni, allora sono
*trovabili*. Puoi misurarli, monitorarli, persino spingerli un po', e farlo con
strumenti lineari semplici invece di lottare con l'intera rete aggrovigliata. Una parte
sorprendentemente grande dell'interpretability moderna si regge su questa singola ipotesi.

## Ruota gli assi, e i neuroni mentono

Ecco un esperimento mentale che rende l'idea tagliente. Prendi l'intera nuvola dei
vettori di attivazione e **ruota il sistema di coordinate**: lascia le frecce esattamente
dove sono, limitandoti a girare gli assi rispetto a cui le misuri. Ogni singolo *valore
di neurone* cambia. Ma gli **angoli tra le frecce, e i loro prodotti scalari, non si
muovono di un millimetro**.

<figure>
  <img src="{{ '/assets/img/posts/basis-rotation.png' | relative_url }}"
       alt="Due diagrammi disegnati a mano affiancati che mostrano gli stessi vettori con orientamenti degli assi diversi; l'angolo theta tra l'attivazione e la concept direction è identico in entrambi.">
  <figcaption>Ruota gli assi (a destra) e ogni lettura dei neuroni cambia completamente, eppure l'angolo θ tra l'attivazione e la concept direction, la parte che porta davvero il significato, resta esattamente lo stesso.</figcaption>
</figure>

Quindi, se avessi appeso un'interpretazione a "il neurone 37 si attiva per X", una
rotazione innocua l'avrebbe cancellata, pur calcolando il modello esattamente la stessa
cosa. In uno spazio **senza una base privilegiata** gli assi sono solo un righello
arbitrario. Il significato vive nella *geometria relativa* delle direzioni, non in una
singola coordinata.

Questa è la versione pulita. La versione onesta ha un risvolto che vale la pena
conoscere: **non tutti gli spazi dentro al modello sono liberi di ruotare.**

- Il **residual stream**, lo spazio di lavoro condiviso in cui i concetti vengono
  scritti, non ha davvero una base privilegiata. Puoi ruotarlo e assorbire la rotazione
  nelle matrici di pesi circostanti senza cambiare il comportamento della rete, quindi
  leggere una sua singola dimensione isolata è genuinamente privo di senso.
- Gli **hidden unit delle MLP** sono un'altra storia. La loro nonlinearità (ReLU/GELU)
  agisce su ciascuna coordinata *separatamente*, e questo inchioda gli assi: ruota quello
  spazio e cambi la funzione che il layer calcola. Lì gli assi dei neuroni sono reali.

Ed è in questo secondo caso che la faccenda si fa interessante. Persino dove i neuroni
*sono* oggetti privilegiati e reali, i concetti continuano a rifiutarsi di allinearsi a
loro. Gli assi sono fissati, eppure le feature puntano comunque con le loro angolazioni
testarde. Questa testardaggine ha un nome, ed è il prossimo pezzo del puzzle.

## Il rompicapo: troppe idee, poco spazio

Ecco la tensione. Un modello deve rappresentare un numero enorme di concetti, molti di
più dei neuroni che ha. Un layer di media grandezza può avere qualche migliaio di
dimensioni, ma il modello tiene chiaramente traccia di *molte* più di qualche migliaio
di cose distinguibili sul suo input.

Come fai a far stare diecimila concetti in uno spazio a mille dimensioni?

Bari, con astuzia. Questa è la **superposition**: il modello stipa nello spazio molte più
concept direction di quante siano le dimensioni, lasciandole *sovrapporre* un po'.
Funziona grazie a un fatto silenzioso sul linguaggio: in un dato istante **quasi tutti i
concetti sono assenti**. Una frase su una ricetta francese non parla allo stesso tempo
di fisica quantistica, statistiche di basket e contratti legali. Visto che solo una
manciata di concetti è "acceso" alla volta, le loro direzioni possono condividere lo
spazio senza pestarsi i piedi troppo spesso.

> Immagina un piccolo appartamento condiviso da cento coinquilini che non sono quasi mai
> a casa nello stesso momento. Con un po' di fortuna e di organizzazione, cento persone
> possono vivere in uno spazio costruito per dieci, *finché non si presentano tutte
> insieme.* La superposition è il modello che fa esattamente questo con i concetti.

Per il modello è un ottimo affare: più capacità rappresentativa a costo zero. Ma è un
incubo per chiunque provi a interpretarlo.

## Il sintomo: i neuroni polisemantici

La superposition ha una conseguenza visibile, ed è proprio ciò che manda in frantumi il
sogno "un neurone, un concetto": la **polisemanticità**.

Siccome le concept direction non si allineano in modo pulito ai singoli neuroni, ogni
neurone finisce per partecipare a *molti* concetti non correlati alla volta. Lo ispezioni
e lo trovi che si attiva, mettiamo, per le citazioni accademiche *e* per il colore verde
*e* per una particolare stranezza grammaticale: un guazzabuglio apparentemente privo di
senso. Il neurone non è guasto. È solo che il modello non ha mai accettato di
organizzarsi un-concetto-per-neurone. La struttura vera vive nelle *combinazioni* di
neuroni, in direzioni che li attraversano.

È per questo che fissare i neuroni quasi non dice nulla. È come provare a leggere un
accordo esaminando una sola corda.

## E allora cosa ci facciamo?

Se le unità dotate di significato sono direzioni, e quelle direzioni sono spalmate sui
neuroni e sovrapposte tra loro, la domanda pratica centrale diventa:

**Come recuperiamo i concetti originali e puliti dal pasticcio sovrapposto?**

È esattamente il compito degli **sparse autoencoder (SAE)**, l'argomento della
[prossima nota]({{ '/it/research/sparse-autoencoders/' | relative_url }}). In breve:
addestriamo una seconda piccola rete il cui unico scopo è "smescolare" le attivazioni in una lunga lista
di feature che restano spente quasi sempre, rispecchiando la sparsità che ha reso
possibile la superposition in primo luogo.

È anche il motivo per cui il quadro lineare è più di una storia ben confezionata. Nel
nostro lavoro sulla [separazione safe-unsafe]({{ '/#publications' | relative_url }}),
l'intero metodo si appoggia su di esso: se "richiesta non sicura" è una direzione, allora
una semplice lettura lungo quella direzione può segnalare gli input pericolosi, senza
riaddestramento e senza interventi chirurgici sui pesi. L'ipotesi di questa nota è la
fondazione su cui poggia quel risultato.

## La versione in un paragrafo

I modelli non immagazzinano i concetti nei neuroni; li immagazzinano come **direzioni**
in uno spazio ad alta dimensionalità (la linear representation hypothesis). Per
rappresentare più concetti di quante siano le dimensioni, lasciano quelle direzioni
**sovrapporsi**, sfruttando il fatto che pochi concetti sono attivi alla volta (la
superposition). L'effetto collaterale è che i singoli neuroni sembrano insensati, ognuno
ingarbugliato in molti concetti non correlati (la polisemanticità). L'interpretability,
allora, non consiste nel leggere i neuroni: consiste nel trovare le direzioni giuste.
