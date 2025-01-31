import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090/_/#/collections?collection=pbc_3384004117&filter=&sort=-%40rowid');


export async function allMaisons(){
    const allmaisons = await pb.collection('Maison').getFullList();
    return allmaisons;
}

export async function oneID(id){
    const oneID = await pb.collection('Maison').getOne(id);
    return oneID;
}

export async function allMaisonsFavori(){
    const allMaisonsFavori = await pb.collection('Maison').getFullList({filter: 'favori=true'});
    return allMaisonsFavori;
}


export async function allMaisonsSorted(){
    const allMaisonsSorted = await pb.collection('Maison').getFullList({sort: '-prix'});
    return allMaisonsSorted;
}

export async function bySurface(surface){
    const bysurface = await pb.collection('Maison').getFullList({filter: `surface>${surface}`});
    return bysurface;
}

export async function surfaceORprice(surface, prix) {
    const surfaceORprice = await pb.collection('Maison').getFullList({filter: `surface>${surface} || prix<${prix}`});
    return surfaceORprice;
}


export async function createAgent(nom, prenom, email) {
    const newAgent = await pb.collection('Agent').create({
        nom: nom,
        prenom: prenom,
        email: email
    });
    return newAgent;
}


export async function getOffres() {
    try {
        let data = await pb.collection('Maison').getFullList({
            sort: '-created',
        });
        data = data.map((maison) => {
            maison.imageUrl = `http://127.0.0.1:8090/api/files/Maison/${maison.id}/${maison.image}`;
            return maison;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}