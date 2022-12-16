import "./App.css";
import React, {useEffect, useState} from "react";
import { getStorage, ref, listAll, list, getDownloadURL } from "firebase/storage";
import "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function Storage(){
    
    // vi bruger data til at gemme alle filerne
    const [data, setData] = useState([]);
     //vi bruger folderItems til at gemme de ting vi har i filer
    let [folderItems, setFolderItems] = useState([]);
    const auth = getAuth();
    let localUser = auth.currentUser;

    let storage = getStorage();
    let storageRef = ref(storage);


    onAuthStateChanged(auth, (user) => {
        if (user) {
        const uid = user.uid;
        console.log("brugerid:" + uid);
    // ...
        } 
        else {
    // User is signed out
    // ...
        console.log("bruger er ikke logget ind");
        }
    });

    useEffect ( () => {
        listAll(storageRef).then((res) => {
            res.prefixes.forEach((folderRef) => {
                console.log(folderRef.fullPath);
            });
            res.items.forEach((itemRef) => {
                console.log(itemRef);
            });
        },); 
        GetFolders();
        // eslint-disable-next-line
    }, []); //De 2 firkanter gør at den ikke bliver ved med at køre dataen, det kan man se i console.log
    
    const GetFolders = async () => {
        const firstPage = await list(storageRef, { maxResults: 100 });
        let itemArr = [];
        //løber igennem prefixes eller mapper så vi kan gemme dem i et array og der efter gemmer vi det i vores setData state
        firstPage.prefixes.forEach((item) => {
        const getFullPath = item.fullPath;
        itemArr.push(getFullPath);
        });
        setData(itemArr);
    };

    const AllItems = async (path) => {
        //laver en refference til folderen der er klikket på
        const folderPath = ref(storage, path);
        const firstPage = await list(folderPath, { maxResults: 100 });
    
        //mapper igennem de items eller filer som den kan finde
        const items = firstPage.items.map((item) =>
          //kalder getDownloadURL som tager fat i items url
          getDownloadURL(ref(folderPath, item.name))
        );
        //alt bliver sat til promise.all some venter på at all items er kørt igennem og sørger
        //for at vi kan bruge den på den måde vi gør
        const alt = await Promise.all(items);
        //return alt
        return alt;
      };

    const GetPdfUrl = (path) => {
        //kalder AllItems og tager i mod det data vi får fra vores promise og setter setFoulderItems state til de items
        AllItems(path).then((items) => setFolderItems(items));
    };
    
    console.log(localUser);

    if (localUser) {
        return (            
            <div>
                <ul>
                    <div> 
                    {data.map((x) =>{ 
                        return (
                            <button key={x} onClick={() => GetPdfUrl(x)}> {x} </button> 
                            // Laver knapper ud fra hvor mange mapper vi har. data.map henter data fra vores array oppe i toppen
                            // laver en key så react kan holde styr på dem og laver en onclik der der kalder GetPdfUrl med parameterne x
                        );
                    })}
                    {folderItems.map((item) => {
                        const yourWindow = window.open(item);
                        yourWindow.opener = null;
                        yourWindow.target = "_blank";
                        return(<p></p>); //Der skal være en return, ellers kommer der en error i terminalen, så vi har lavet den tom
                        /*return (
                            <iframe key={item} src={item} title="item"></iframe>
                        );
                        */
                    })}
                    </div>
                </ul>
            </div>                
        )
    }
    else {
        return (
            <p></p>
        )
    }
}

export default Storage;