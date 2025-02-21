import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090/');


export async function getOffres() {
    try {
        let data = await pb.collection('Maison').getFullList({
            sort: '-created',
        });
        data = data.map((maison) => {
            maison.images = pb.files.getURL(maison, maison.images);
            return maison;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getOffre(id) {
    try {
        let data = await pb.collection('Maison').getOne(id);
        data.images = pb.files.getURL(data, data.images);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function bySurface(surface){
    const bysurface = await pb.collection('Maison').getFullList({filter: `surface>${surface}`});
    return bysurface;
}

/*
export async function allMaisonsSorted(prix){
    const Records = await pb.collection('Maison').getFullList({filter: `prix<${prix}`});
    return Records;
}
*/

export async function allMaisonsSorted(prixMin, prixMax){
    const Records = await pb.collection('Maison').getFullList({filter: `${prixMin}<prix && prix<${prixMax}`});
    return Records;}

export async function addOffre(house) {
    try {
        await pb.collection('Maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function filterByPrix(prixMin, prixMax) {
  try {
    let data = await pb.collection("Maison").getFullList({
      sort: "-created",
      filter: `prix >= ${prixMin} && prix <= ${prixMax}`,
    });
    data = data.map((maison) => {
      maison.images = pb.files.getURL(maison, maison.images);
      return maison;
    });
    return data;
  } catch (error) {
    console.log(
      "Une erreur est survenue en filtrant la liste des maisons",
      error
    );
    return [];
  }
}

export async function allAgents() {
    try {
        let data = await pb.collection('Agent').getFullList();
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des agents', error);
        return [];
    }
}

export async function allMaisonsByAgentsId(email) {
    try {
          const allRecord = await pb.collection("Maison").getFullList({
        filter: `Agent = ${email}`,
        expand: "Agent",
  });
  return allRecord;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
        
    }

}