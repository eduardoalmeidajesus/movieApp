import { IonAvatar, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert, useIonLoading } from '@ionic/react';
import useApi, { SearchResult, SearchType } from '../hooks/useApi';
import { useEffect, useState } from 'react';
import { filmOutline, gameControllerOutline, tvOutline, videocamOutline } from 'ionicons/icons';

const Home: React.FC = () => {

  const { searchData } = useApi()

  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState<SearchType>(SearchType.all);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [presentAlert] = useIonAlert();
  const [loading, dismiss] = useIonLoading();

  useEffect(() =>{
    if(searchTerm === ''){
      setResults([]);
      return;
    }
    const loadData = async () => {
      await loading('Carregando...');
      

      const results:any = await searchData(searchTerm, type);
      await dismiss();

      if(results?.Error){
        presentAlert({
          header: 'Erro',
          message: results.Error,
          buttons: ['OK'],
        });
       // setResults([]);
      }else{
        setResults(results.Search);
      }
      
      console.log(results);
    }

    loadData();
  }, [searchTerm, type])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonTitle>Movie App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar 
        value={searchTerm}
        debounce={300} 
        onIonChange={(e) => setSearchTerm(e.detail.value!)}></IonSearchbar>

        <IonItem>
          <IonLabel>Selecione um tipo de busca</IonLabel>
          <IonSelect 
          value={type}
          onIonChange={(e) => setType(e.detail.value!)}
          > 
            <IonSelectOption value="">Todos</IonSelectOption>
            <IonSelectOption value="movie">Filme</IonSelectOption>
            <IonSelectOption value="series">Série</IonSelectOption>
            <IonSelectOption value="episode">Episódio</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonList>
          {results.map((item: SearchResult) => (
            <IonItem button key={item.imdbID} routerLink={`/details/${item.imdbID}`}>
              <IonAvatar slot="start">
                <img src={item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/150'} alt={item.Title} />
              </IonAvatar>
              <IonLabel className='ion-text-wrap'>
                <h2>{item.Title}</h2>
                <p>{item.Year} - {item.Type}</p>
              </IonLabel>
              {item.Type === 'movie' && <IonIcon icon={videocamOutline} slot="end" /> }
              {item.Type === 'series' && <IonIcon icon={tvOutline} slot="end" /> }
              {item.Type === 'game' && <IonIcon icon={gameControllerOutline} slot="end" /> }
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
