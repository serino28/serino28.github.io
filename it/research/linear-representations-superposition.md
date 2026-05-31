---
layout: post
title: "Rappresentazioni lineari e superposition: come i modelli rappresentano i concetti"
description: "Perché i concetti sono codificati come direzioni e non come neuroni (la linear representation hypothesis), come la superposition permette di rappresentare più feature delle dimensioni disponibili, e perché questo lascia i singoli neuroni polisemantici."
date: 2024-10-15
tags: [Interpretabilità, Fondamenti]
lang: it
permalink: /it/research/linear-representations-superposition/
alt_url: /research/linear-representations-superposition/
---

La mechanistic interpretability poggia su un'affermazione su *dove* viva il significato
dentro una rete neurale. L'aspettativa ingenua è che ogni neurone codifichi un concetto,
così che leggere un modello equivarrebbe a individuare il "neurone del francese" o il
"neurone del sentiment." Quell'aspettativa è quasi del tutto sbagliata, e capire perché è la
base di tutto ciò che segue, inclusi gli sparse autoencoder trattati nella
[prossima nota]({{ '/it/research/sparse-autoencoders/' | relative_url }}). Questa nota
sviluppa le tre idee che insieme spiegano come i modelli linguistici rappresentano davvero
ciò che sanno: la **linear representation hypothesis**, la **superposition** e la
**polisemanticità**.

## La linear representation hypothesis

Considera lo stato interno del modello a un dato layer come un vettore in uno **spazio delle
attivazioni** ad alta dimensionalità (per un modello di media grandezza, dell'ordine del
migliaio di dimensioni). La **linear representation hypothesis** afferma che i concetti
interpretabili sono codificati come *direzioni* in quello spazio: a un concetto corrisponde
un vettore, e quanto il modello rappresenti quel concetto su un dato input è, in prima
approssimazione, la proiezione dell'attivazione su quella direzione.

Una **feature** è quindi una direzione, non un neurone. Per verificare se il modello
rappresenta "questo testo è in francese" non ispezioni una singola coordinata: fai il
prodotto scalare dell'attivazione con la direzione del francese e ne leggi la magnitudo. La
prima evidenza di questo quadro è la struttura lineare dei word embedding, dove le relazioni
semantiche compaiono come offset vettoriali consistenti (Mikolov et al., 2013).

<figure>
  <img src="{{ '/assets/img/posts/linearity-word2vec.png' | relative_url }}"
       alt="Diagramma vettoriale disegnato a mano con le parole king, queen, man e woman, disposte in modo che lo spostamento da man a king corrisponda a quello da woman a queen.">
  <figcaption>La struttura lineare dei word embedding: le relazioni semantiche compaiono come offset vettoriali consistenti, con <em>king − man + woman ≈ queen</em>. Questa linearità nello spazio di input è la prima evidenza che il significato è codificato in direzioni. (Mikolov et&nbsp;al., 2013; Park et&nbsp;al., 2024.)</figcaption>
</figure>

Applicata alle attivazioni interne invece che agli embedding di input, la stessa idea è ciò
che rende trattabile l'interpretability: se un concetto è una direzione, può essere
localizzato, misurato, monitorato e modificato con strumenti lineari.

<figure>
  <img src="{{ '/assets/img/posts/feature-as-direction.png' | relative_url }}"
       alt="Assi 3D disegnati a mano ed etichettati neuron 1, 2 e 3, con una freccia rossa 'concept direction' che mescola tutti e tre gli assi invece di allinearsi a uno solo.">
  <figcaption>Una feature è una direzione, non un neurone: un vettore unitario composto da molti neuroni insieme, con una sua angolazione rispetto agli assi delle coordinate. (Elhage et&nbsp;al., <em>A Mathematical Framework for Transformer Circuits</em>, Anthropic.)</figcaption>
</figure>

## Nessuna base privilegiata: il significato è nelle direzioni, non nelle coordinate

Se le feature sono direzioni, i singoli assi dei neuroni non hanno alcuno status speciale, e
un argomento standard lo rende preciso. Applica una rotazione ortogonale al sistema di
coordinate, lasciando invariati i vettori di attivazione e girando solo gli assi rispetto a
cui li leggiamo. Ogni *valore di neurone* cambia, ma ogni angolo e ogni prodotto scalare tra
i vettori si conserva. Poiché la lettura della rappresentazione lineare dipende solo dai
prodotti scalari, il contenuto rappresentato dal modello è invariante alla rotazione, mentre
qualunque interpretazione ancorata a uno specifico neurone viene distrutta.

<figure>
  <img src="{{ '/assets/img/posts/basis-rotation.png' | relative_url }}"
       alt="Due diagrammi disegnati a mano affiancati che mostrano gli stessi vettori con orientamenti degli assi diversi; l'angolo theta tra l'attivazione e la concept direction è identico in entrambi.">
  <figcaption>Ruotare gli assi delle coordinate cambia ogni valore di neurone ma conserva tutti gli angoli e i prodotti scalari. Il contenuto rappresentato (la proiezione sulla concept direction, l'angolo θ) è invariante; un'interpretazione ancorata ai neuroni no.</figcaption>
</figure>

È questo il senso in cui lo spazio delle attivazioni non ha una **base privilegiata**: gli
assi delle coordinate sono un sistema di riferimento arbitrario, e il significato vive nella
geometria relativa delle direzioni. C'è però una precisazione importante, perché non ogni
spazio dentro un transformer è invariante per rotazione:

- Il **residual stream**, lo spazio di attivazioni condiviso da cui i componenti leggono e su
  cui scrivono, non ha davvero una base privilegiata. Una rotazione può essere assorbita
  nelle matrici di pesi circostanti senza cambiare la funzione della rete, quindi leggere una
  sua singola dimensione isolata è privo di senso.
- Lo **strato nascosto della MLP** è diverso. La sua nonlinearità element-wise (ReLU, GELU)
  agisce su ciascuna coordinata indipendentemente, e questo *privilegia* la base: ruotare
  quello spazio cambia la funzione che il layer calcola, quindi lì gli assi dei neuroni sono
  oggetti dotati di significato.

L'osservazione decisiva è che persino dove la base è privilegiata, le feature continuano a
non allinearsi ai neuroni. Gli assi sono fissi, eppure le direzioni che il modello usa
stanno con la propria angolazione rispetto a loro. Quel disallineamento non è un caso: è la
firma della superposition.

## Superposition: rappresentare più feature delle dimensioni

Un modello deve rappresentare molti più concetti delle dimensioni che ha: un layer con
qualche migliaio di dimensioni tiene traccia di molte più di qualche migliaio di proprietà
distinguibili del suo input. La **superposition** è come concilia questo fatto. Il modello
codifica più direzioni di feature di quante siano le dimensioni, lasciandole solo
*approssimativamente* ortogonali e facendole interferire un po'.

Due fatti lo rendono possibile. Primo, gli spazi ad alta dimensionalità contengono
esponenzialmente molte direzioni *quasi ortogonali*, così un gran numero di feature può
coesistere con piccola interferenza reciproca. Secondo, i dati naturali sono **sparsi**: in
ogni istante quasi ogni concetto è assente, dato che una frase su una ricetta francese non
parla allo stesso tempo di teoria quantistica dei campi, basket e diritto contrattuale.
Poiché solo poche feature sono attive alla volta, le loro direzioni collidono di rado, e il
modello riesce a decodificarle nonostante la sovrapposizione. La superposition è, di fatto,
uno schema di compressione appreso che scambia un po' di interferenza per un grande guadagno
di capacità rappresentativa (Elhage et al., *Toy Models of Superposition*, 2022).

## Polisemanticità: perché i singoli neuroni sembrano insensati

La superposition ha una conseguenza diretta e osservabile. Poiché le direzioni delle feature
non sono allineate alla base dei neuroni, ogni singolo neurone partecipa a molte feature non
correlate alla volta. Ispezionarlo mostra attivazione su una miscela apparentemente
arbitraria, per esempio citazioni accademiche, il colore verde e una particolare costruzione
grammaticale. Questa è la **polisemanticità**, ed è il motivo per cui l'ispezione a livello
di neurone è inaffidabile: il neurone non è guasto, semplicemente non è mai stato l'unità di
rappresentazione. La struttura vive in direzioni che attraversano i neuroni, e recuperare una
descrizione un-concetto-per-unità, cioè la **monosemanticità**, richiede di cambiare base
invece di leggere quella esistente.

## Dalla superposition al dictionary learning

Questo inquadra il problema pratico centrale. Se le unità dotate di significato sono
direzioni, spalmate sui neuroni e sovrapposte per via della superposition, come recuperiamo
un insieme pulito e monosemantico di feature dalle attivazioni aggrovigliate? Posto così, è
un problema di **dictionary learning**: trovare un insieme overcomplete di direzioni tale che
ogni attivazione sia una loro combinazione sparsa. È esattamente il compito degli **sparse
autoencoder**, l'argomento della
[prossima nota]({{ '/it/research/sparse-autoencoders/' | relative_url }}).

Lo stesso quadro lineare sostiene anche il lavoro applicato sulla sicurezza. Nel nostro
risultato sulla [separazione safe-unsafe]({{ '/#publications' | relative_url }}), una singola
direzione nello spazio delle attivazioni basta per segnalare gli input non sicuri con una
lettura lineare, senza modificare i pesi. L'ipotesi sviluppata qui è la fondazione su cui
poggiano questi metodi.

## In sintesi

I modelli linguistici non rappresentano i concetti nei neuroni; li rappresentano come
**direzioni** nello spazio delle attivazioni (la linear representation hypothesis). Poiché lo
spazio non ha una **base privilegiata**, gli assi dei neuroni sono un riferimento arbitrario
e il significato vive nella geometria relativa delle direzioni. Per rappresentare più feature
delle dimensioni, il modello le mette in **superposition**, sfruttando la quasi-ortogonalità
e la sparsità dei dati naturali, ed è questo a rendere i singoli neuroni **polisemantici**.
L'interpretability non è quindi l'atto di leggere i neuroni, ma di recuperare le direzioni
giuste, che è esattamente ciò che dictionary learning e sparse autoencoder si propongono di
fare.
