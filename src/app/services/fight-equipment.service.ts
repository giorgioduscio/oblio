import { Injectable } from '@angular/core';

@Injectable({providedIn: `root`})
export class FightEquipmentService {
  // TODO ARMATURE
  armors :fightTool[] =[
    // optimize ARMATURA
    { category: `armatura di cuoio`,
      weight: 5,
      cost: 1000,
      increases: [
        { bonus: 2, description: `Quando viene indossata` },
      ],
      imageUrl: ``
    },
    { category: `cotta di maglia`,
      weight: 20.7,
      cost: 100000,
      increases: [
        { bonus: 4, description: `Quando viene indossata` },
      ],
      features: [
        `Se il bonus in destrezza vale solo fino a +2, altrimenti verrà calcolato come un +2`,
        `Il bonus di Destrezza viene aggiunto fino a un massimo di +2 per determinare la classe armatura`,
        `Immunità alle armi contundenti`,
        `Richiede addestramento`,
      ],
      imageUrl: ``
    },
    { category: `armatura di piastre`,
      weight: 32.5,
      cost: 250000,
      increases: [
        { bonus: 2, description: `Quando viene indossata` },
        { bonus: 5, description: `Quando il proprio avversario non ci stà lottando contro` },
      ],
      features: [
        `Richiede almeno +2 in forza`,
        `Svantaggio in prove di furtività e percezione`,
        `Immunità alle armi semplici`,
        `Il bonus in destrezza non viene aggiunto`,
        `Richiede addestramento`,
      ],
      imageUrl: ``
    },
    // optimize EQUIP. DIFENSIVO
    { category: `Scudo a brocchiero`,
      weight: 1,
      cost: 100,
      increases: [
        { bonus: 2, description: `Quando viene impugnato` },
      ],
      features: [
        `Può essere nascosto in zaini, borse o lunghe vesti`,
        `Richiede addestramento`,
        `Inefficace contro armi a distanza`,
      ],
      imageUrl: ``
    },
    { category: `cappa da parata`,
      weight: 4,
      cost: 50,
      increases: [
        { bonus: 2, description: `Quando viene impugnato` },
      ],
      features: [
        `Può essere nascosto in zaini, borse o essere equipaggiato`,
        `Richiede addestramento`,
        `Inefficace contro armi a distanza`,
      ],
      imageUrl: ``
    },
    { category: `pugnale da parata`,
      weight: 1,
      cost: 100,
      increases: [
        { bonus: 2, description: `Quando viene impugnato` },
      ],
      features: [
        `Può essere nascosto in zaini, borse o lunghe vesti`,
        `Richiede addestramento`,
        `Inefficace contro armi a distanza`,
      ],
      imageUrl: ``
    },
    { category: `scudo a rotella`,
      weight: 6,
      cost: 1000,
      increases: [
        { bonus: 2, description: `Quando viene impugnato` },
      ],
      features: [
        `Richiede addestramento`,
      ],
      imageUrl: ``
    },
    { category: `scudo a torre`,
      weight: 10,
      cost: 1000,
      increases: [
        { bonus: 2, description: `Quando viene impugnato` },
        { bonus: 1, description: `Se lo spazio di 1.5m attorno è libero da strutture immobili` },
      ],
      features: [
        `Richiede addestramento`,
      ],
      imageUrl: ``
    },
  ]
  // TODO ARMI
  weapones :fightTool[] =[
    // optimize DA GUERRA
    { category: `arma inastata`,
      weight: 1.5,
      cost: 500,
      imageUrl: `https://img.freepik.com/vettori-premium/lancia-arma-dell-impero-romano-tombak-con-una-lunga-lama-e-mostrato-su-uno-sfondo-bianco_679343-15.jpg?w=740`,
      features: [
        `Gittata di 3m`,
        `Può essere lanciata 30/50 metri`,
      ],
      increases: [
        { bonus: 1, description: `Se l'avversario non impugna scudi` },
        { bonus: 1, description: `Se l'arma avversaria è più corta` },
        { bonus: 1, description: `Se lo spazio di 3m attorno è libero da strutture immobili` },
      ],
    },    
    { category: `arma inastata pesante`,
      weight: 3,
      cost: 1000,
      imageUrl: `https://upload.wikimedia.org/wikipedia/commons/a/ac/Hallebarde_177.jpg`,
      features: [
        `Ha gittata di 3 metri`,
        `Gli attacchi devono essere manovrati con due mani`,
        `Richiede addestramento`,
      ],
      increases: [
        { bonus: 2, description: `Se l'avversario ha un'armatura di piastre` },
        { bonus: 1, description: `Se l'arma avversaria è più corta` },
        { bonus: 2, description: `Se lo spazio di 1.5m attorno è libero da strutture immobili` },
      ],
    },    
    { category: `arma pesante`,
      weight: 3,
      cost: 1000,
      imageUrl: `https://cdn11.bigcommerce.com/s-99kn4fj7jr/images/stencil/1280x1280/products/321/579/88WGS_1__31003.1607300814.jpg?c=1`,
      features: [
        `Gli attacchi devono essere manovrati con due mani`,
        `Richiede addestramento`,
      ],
      increases: [
        { bonus: 2, description: `Se l'avversario ha un'armatura di piastre` },
        { bonus: 2, description: `Se l'arma avversaria è più corta` },
        { bonus: 1, description: `Se lo spazio di 1.5m attorno è libero da strutture immobili` },
      ],
    },
    // optimize SECONDARIE
    { category: `arma bilanciata lunga`,
      weight: 1.5,
      cost: 800,
      imageUrl: `https://www.laforgiadelgrifone.com/wp-content/uploads/2019/04/0101110500.jpg`,
      features: [
        `Richiede addestramento`,
      ],
      increases: [
        { bonus: 2, description: `Se l'arma avversaria è più corta` },
        { bonus: 1, description: `Se l'arma avversaria è sbilanciata` },
      ],
    },
    { category: `arma bilanciata corta`,
      weight: 1,
      cost: 800,
      imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA2IYMGU4t_YRrU9q72yfOBpKxw9Ef486IFQk2HReNNWXothLgTeI7DhsBPLZcSjisxJA&usqp=CAU`,
      features: [
        `Richiede addestramento`,
      ],
      increases: [
        { bonus: 1, description: `Se l'arma avversaria è sbilanciata` },
        { bonus: 2, description: `Se lo spazio di 3m attorno è occupato da strutture immobili` },
      ],
    },
    // optimize TERZIARIE
    { category: `arma sbilanciata scure`,
      weight: 2,
      cost: 500,
      imageUrl: `https://www.medioevo.com/196-medium_default/scure-d-arme-xvi-secolo.jpg`,
      increases: [
        { bonus: 2, description: `Se lo scudo avversario è a rotella o a torre` },
      ],
    },
    { category: `arma sbilanciata mazza`,
      weight: 5,
      cost: 400,
      imageUrl: `https://images.ontheedgebrands.com/cdn-cgi/image/f=auto,height=700,width=700,quality=90/images/A14-BK1807.jpg`,
      increases: [
        { bonus: 2, description: `Se l'armatura avversaria è a piastre` },
        { bonus: 1, description: `Se lo spazio di 3m attorno è occupato da strutture immobili` },
      ],
    },
    { category: `arma sbilanciata flagello`,
      weight: 5,
      cost: 600,
      imageUrl: `https://www.giornalelavoce.it/resizer/-1/-1/true/2021/09/index-28.jpg--.jpg`,
      features: [
        `Richiede addestramento`,
      ],
      increases: [
        { bonus: 1, description: `Se lo scudo avversario è a rotella o a torre` },
        { bonus: 2, description: `Se l'armatura avversaria è a piastre` },
      ],
    },
    { category: `arma piccola`,
      weight: 0.5,
      cost: 300,
      imageUrl: `https://www.jollysoftair.com/11506-home_default/pugnale-medievale-ornamentale-zs3240.jpg`,
      features: [
        `Può essere lanciata 7/12 metri`,
      ],
      increases: [
        { bonus: 1, description: `Se lo spazio di 3m attorno è occupato da strutture immobili` },
        { bonus: 2, description: `Se si lotta contro l'avversario` },
      ],
    },
    { category: `tirapugni`,
      weight: 0.5,
      cost: 300,
      imageUrl: `https://st.depositphotos.com/1028437/5138/v/450/depositphotos_51387097-stock-illustration-brass-knuckles.jpg`,
      increases: [
        { bonus: 1, description: `Se lo spazio di 3m attorno è occupato da strutture immobili` },
        { bonus: 2, description: `Se si lotta contro l'avversario` },
      ],
    },
  ]
}
export interface fightTool{
  category :string,
  weight :number,
  imageUrl :string,
  cost :number,
  increases :{
    bonus :number,
    description :string,
  }[],
  features? :string[]
}