import { Injectable } from '@angular/core';
import { Privilege } from './privileges';

@Injectable({
  providedIn: 'root'
})
export class PrivilegesService {
  privileges :Privilege[] =[
    {
      title: `Allerta`,
      description: `Il personaggio ottiene un bonus +5 all'iniziativa, non può essere sorpreso finché cosciente e chi lo attacca o interagisce fisicamente con lui in maniera furtiva, non dispone di vantaggio`,
      cost: 2
    },
    {
      title: `Arti marziali`,
      description: `Il personaggio ha competenza nei colpi senz'armi (questi prendono le proprietà del pugnale) e, assieme alle armi che non richiedono addestramento, possono utilizzare il bonus di destrezza`,
      cost: 3
    },
    {
      title: `Arti marziali`,
      description: `Il personaggio ha competenza nei colpi senz'armi (questi prendono le proprietà del pugnale) e, assieme alle armi che non richiedono addestramento, possono utilizzare il bonus di destrezza`,
      cost: 2
    },
    {
      title: `Atleta`,
      description: `>Quando è prono, impiega solo 1.5m per rialzarsi >Scalare non gli costa movimento extra >Può effettuare un ‘salto in lungo in rincorsa’ o un ‘salto in alto con rincorsa’ muovendosi di 1.5m`,
      cost: 2
    },
    {
      title: `Attore`,
      description: `>Ha vantaggio nelle prove su Inganno e Intrattenere quando prova a fingersi qualcun altro >Può imitare la voce o i versi di una creatura che ha ascoltato per almeno un minuto. Superando una contrapposizione tra Intuizione dell'ascoltatore e Inganno del personaggio, il primo capisce l'inganno `,
      cost: 2
    },
    {
      title: `Elemento naturale`,
      description: `Il personaggio sceglie un elemento. Completato un riposo lungo, questo può spendere un'azione ed emanare l’elemento contro uno o più bersagli. Questi sono obbligati a fare un ts (CD 8 +BC +bonus costituzione), se falliscono subiscono il danno legato all'elemento scelto, altrimenti solo metà. L'azione può essere fatta solo una volta dopo un riposo lungo. >Soffio del drago: i bersagli entro un cono 4.5m devono riuscire un tiro su Acrobazia, altrimenti subiscono 2d6 danni dell'elemento scelto >Morso avvelenato: se il personaggio colpisce un bersaglio, questo subisce 2d10 danni da veleno`,
      cost: 2
    },
    {
      title: `Guaritore`,
      description: `>Quando utilizza la borsa del Guaritore per stabilizzare una creatura, questa recupera anche un punto ferita >Con un'azione, può splendere un utilizzo della borsa da guaritore per far recuperare 4 +d6 dei suoi punti ferita`,
      cost: 2
    },
    {
      title: `Attacchi selvaggi`,
      description: `Quando il personaggio mette a segno un colpo critico con un'arma da mischia, può tirare un dado dell'arma aggiuntivo quando determina i danni extra del colpo critico. Inoltre ottiene competenza nell’abilità Intimidire`,
      cost: 2
    },
    {
      title: `Comprimibile`,
      description: `Il personaggio può muoversi attraverso gli spazi di qualsiasi creatura più grande e riuscire a muoversi in spazi stretti senza subire svantaggi a velocità o tiri per colpire o tiri caratteristica`,
      cost: 2
    },
    {
      title: `Contromisure arcane`,
      description: `Il personaggio dispone di vantaggio a tutti i tiri su Intelligenza, Saggezza e Carisma contro la magia`,
      cost: 2
    },
    {
      title: `Maschera della selva`,
      description: `Il personaggio può tentare di nascondersi alla vista altrui anche quando è leggermente oscurato da fogliame, pioggia fitta, neve, foschia e altri fenomeni naturali. Inoltre la sua velocità base sul terreno aumenta di 1,5 metri`,
      cost: 1
    },
    {
      title: `Magia innata`,
      description: `Il personaggio conosce un trucchetto, dopo aver speso in totale 15 punti abilità in qualsiasi altro privilegio, conosce un incantesimo, spendendone 21, ne conosce un’altro. Gli incantesimi possono essere lanciati una sola volta completato un riposo lungo. >Oscuri: trucchetto luci danzanti, L3) luminescenza; L5) oscurità >Demoniaci: trucchetto taumaturgia; l3) intimorire infernale di 2 livello; l5) oscurità`,
      cost: 1
    },
    {
      title: `Mente acuta`,
      description: `Il personaggio >Riesce sempre a risalire alla direzione del nord >Riesce sempre a risalire a quante ore mancano al tramonto >Riesce a ricordare nel dettaglio tutto ciò che accade nell'ultimo mese `,
      cost: 2
    },
    {
      title: `Mobilità`,
      description: `>La velocità aumenta di tre metri >Quando usa l'azione di scatto, non subisce gli effetti del terreno difficile >Quando attacca in mischia una creatura, quest'ultima non può eseguire attacchi di opportunità contro il personaggio`,
      cost: 2
    },
    {
      title: `???Osservatore`,
      description: `Se osserva le labbra di una creatura mentre questa parla un linguaggio conosciuto, riesce a capire cosa dice`,
      cost: 2
    },
    {
      title: `Fortunato lieve`,
      description: `Quando il personaggio ottiene 1 a un tiro per colpire, a una prova di caratteristica o a un tiro salvezza, può ripetere il tiro del dado e deve usare il nuovo risultato`,
      cost: 1
    },
    {
      title: `Fortunato superiore`,
      description: `Dopo un riposo lungo, il personaggio dispone di tre punti che può spendere in tiri per colpire, tiri salvezza e prove caratteristica. Può decidere di usarli dopo aver visto il risultato del dado, ma prima di sapere l'esito della prova. Il giocatore tira un d20 aggiuntivo e sceglie quale usare`,
      cost: 3
    },
    {
      title: `Frenesia del barbaro`,
      description: `Dopo un riposo lungo, il personaggio dispone di tre punti che può spendere in tiri per colpire, tiri salvezza e prove caratteristica. Può decidere di usarli dopo aver visto il risultato del dado, ma prima di sapere l'esito della prova. Il giocatore tira un d20 aggiuntivo e sceglie quale usare`,
      cost: 3
    },
    {
      title: `Furtività innata`,
      description: `Il personaggio può tentare di nascondersi anche se è oscurato solo da una singola creatura, purché questa sia più grande di lui di almeno una taglia`,
      cost: 1
    },
    {
      title: `Ispiratore`,
      description: `Dopo un riposo breve o lungo, il personaggio può impiegare 10 minuti per ispirare sei creature entro 9m (può includere se stesso) che possono udirlo e capirlo. Le creature ottengono un ammontare di punti ferita pari a d10 + il modificatore di Carisma `,
      cost: 2
    },
    {
      title: `Linguista`,
      description: `Il personaggio impara tre linguaggi aggiuntivi e riesce a creare dei codici cifrati. Una creatura può decifrare solo se addestrata a farlo, se supera una prova di investigare (CD intelligenza +BC) oppure con la magia`,
      cost: 2
    },
    {
      title: `Parlare con piccole bestie`,
      description: `Il personaggio può usare suoni e gesti per comunicare i concetti più semplici alle bestie di taglia Piccola o inferiore e quando fa una prova in medicina su questi, può aggiungere il doppio del suo bonus di competenza`,
      cost: 2
    },
    {
      title: `Professionista`,
      description: `Il personaggio è competente in una materia (ambito lavorativo) ed aggiunge il BC quando effettua una prova utilizzando gli strumenti della materia scelta >Strumento da artigiano (Fabbro) >Strumento musicale >Arnesi da ladro >Trucchi per il camuffamento >Veicolo (terrestre, aereo, nautico o sotterraneo)`,
      cost: 2
    },
    {
      title: `Protettore`,
      description: `>Dopo un riposo lungo, il personaggio dispone di tante cariche quanto il Modificatore di saggezza e sceglie al massimo due creature >Quando il personaggio usa una carica si pone tre domande: 1) Il suo protetto è in pericolo? 2) Il protetto sta seguendo i propri consigli? 3) Il protetto si trova entro 3 metri da lui? Per ogni risposta affermativa, aggiunge +1 ad ogni prova fatta per cercare di impedire un evento che comprometterebbe l'incolumità del protetto`,
      cost: 2
    },
    {
      title: `Taglia enorme`,
      description: `>Altezza: dai 5 ai 10 metri >Punteggi: +2 forza, -2 destrezza >Bonus: la capacità di trasporto è 300kg, quando fa una contrapposizione contro una creatura più piccola ottiene +2 in atletica e intimidire >Malus: ha bisogno di almeno 30 porzioni di cibo al giorno, -2 nelle prove di furtività contro una creatura media o inferiore`,
      cost: 2
    },
    {
      title: `Taglia grande`,
      description: `Altezza: dai 2 ai 5 metri >Punteggi: +1 forza, -1 destrezza >Bonus: raddoppia la capacità di trasporto, quando fa una contrapposizione contro una creatura più piccola ottiene +1 in atletica >Malus: ha bisogno di almeno 10 porzioni di cibo al giorno`,
      cost: 2
    },
    {
      title: `Taglia mastodontica`,
      description: `Altezza: dai 10 ai 60 metri >Punteggi: +2 forza, -2 destrezza, +1 costituzione >Bonus: la capacità di trasporto è 1000kg, quando fa una contrapposizione contro una creatura più piccola ottiene +3 in atletica e intimidire >Malus: ha bisogno di almeno 50 porzioni di cibo al giorno, quando interagisce con creature più piccole subisce svantaggio nelle prove di furtività e in percezione quando cerca qualcosa di taglia piccola o minuscola`,
      cost: 3
    },
    {
      title: `Taglia minuscola`,
      description: `Altezza: dai 5 ai 50cm >Punteggi: +1 destrezza, -1 forza >Bonus: può nutrirsi con 1 porzione al giorno, quando fa una contrapposizione contro una creatura più grande dispone di +2 nelle prove di acrobazia e furtività, può muoversi negli spazi di qualsiasi creatura più grande, può muoversi in spazi stretti >Malus: Capacità di trasporto dimezzata, velocità di passo è 4.5m (3 quadrati), le armi con la proprietà ‘portata’ non funzionano contro creature più grandi`,
      cost: 2
    },
    {
      title: `Tenacia implacabile`,
      description: `Quando il personaggio scende a O punti ferita ma non viene ucciso sul colpo, può decidere di rimanere a 1 punto ferita. Non puoi più utilizzare questa capacità finché non completa un riposo lungo ed ha competenza nell’abilità Intimidire`,
      cost: 2
    },
    {
      title: `Trance`,
      description: `Anziché dormire il personaggio entra in meditazione o sonno parziale per 4 ore al giorno, al termine il personaggio ottiene gli stessi benefici di 8 ore di sonno. Inoltre ottiene competenza in percezione`,
      cost: 1
    },
    {
      title: `Multibraccia`,
      description: `Se il personaggio ha più braccia, può impugnare tanti oggetti piccoli (massimo 1 metro quadrato) quanto i propri arti. Non può affettare più attacchi o prendere più scudi`,
      cost: 3
    },
    {
      title: `???Robustezza`,
      description: `Il massimo dei punti ferita del personaggio aumenta di 1 ogni volta che acquisisce un livello`,
      cost: 1
    },
    {
      title: `Saltarello`,
      description: `La distanza del salto del personaggio aumenta di 30 cm per bonus di Destrezza e sottrae il doppio del bonus dai danni da caduta`,
      cost: 2
    },
    {
      title: `Scherma bellica`,
      description: `Il personaggio conosce l’uso di tutte le armi, tutte le armature e scudi`,
      cost: 2
    },
    {
      title: `Scherma civile`,
      description: `Il personaggio conosce l'utilizzo di un'arma che richiede l'addestramento e nelle armature di cuoio. Inoltre può scegliere se averla anche negli scudi a brocchiero o pugnali da parata`,
      cost: 2
    },
    {
      title: `Scurovisione`,
      description: `Il personaggio in condizioni di luce fioca può vedere fino a 18 metri come se si trovasse in condizioni di luce intensa e nell'oscurità come se si trovasse in luce fioca. Nell'oscurità non è in grado di discernere i colori, ma solo le tonalità di grigio`,
      cost: 2
    },
    {
      title: `Scurovisione superiore`,
      description: `La scurovisione di un drow arriva fino a 36 metri, ma dispone di svantaggio ai tiri per colpire e alle prove di Saggezza (Percezione) basate sulla vista quando il personaggio in questione, il bersaglio del suo attacco o l'oggetto da percepire si trovano in piena luce del sole`,
      cost: 2
    },
    {
      title: `Varianti velocità`,
      description: `il personaggio ottiene i seguenti privilegi quando si trova nelle condizioni di poter utilizzare determinati organi. >Creatura volante: ottiene la capacità di volo di 13.5m (9 quadrati) quando è in spazi adeguati per aprire le ali >Creatura marina: ottiene la capacità di nuoto di 13.5m (9 quadrati) quando si trova almeno parzialmente nell’acqua >Creatura scavatrice: ottiene la capacità di scavo pari a quella che ha a piedi quando si trova almeno parzialmente nel terreno >Creatura arrampicatrice: Quando il personaggio utilizza tutti i propri arti, ottiene la capacità di arrampicarsi sulle superfici verticali o a testa in giù, con una velocità di arrampicata pari a quella che ha a piedi`,
      cost: 2
    },
    // {
    //   title: ``,
    //   description: ``,
    //   cost: 2
    // },
  ]
}
