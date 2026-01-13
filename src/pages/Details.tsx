import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonModal, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import useApi, { DetailsResult } from '../hooks/useApi';
import { bodyOutline, clipboardOutline, starHalfOutline, trophyOutline } from 'ionicons/icons';

interface DetailsProps extends RouteComponentProps<{
    id: string;
}> {}

const Details: React.FC<DetailsProps> = ({ match } ) => {

    const { getDetails } = useApi();

    const [information, setInformation] = useState<DetailsResult | null>(null);

    useIonViewWillEnter(() => {
        const id = match.params.id;
        const load = async () => {
            const data = await getDetails(id);
            setInformation(data);
        };
        load();
    });


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>{information?.Genre}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
               {information && (
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>{information.Title}</IonCardTitle>
                        <IonCardSubtitle>{information.Year} - {information.Genre}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent text-center>
                        <IonImg src={information.Poster} alt={`Poster of ${information.Title}`} />
                        <IonItem lines="none">
                            <IonIcon icon={starHalfOutline} slot='start' color='warning' />
                            <IonLabel>{information.imdbRating} / 10</IonLabel>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
               )}
               <IonModal trigger='open-modal' initialBreakpoint={0.25} breakpoints={[0, 0.25, 0.5, 0.75]}>
                    <IonContent className="ion-padding">
                        <IonItem lines='none'>
                            <IonIcon icon={clipboardOutline} slot='start' />
                            <IonLabel>{information?.Director}</IonLabel>
                        </IonItem>

                        <IonItem lines='none'>
                            <IonIcon icon={bodyOutline} slot='start' />
                            <IonLabel className='ion-text-wrap'>{information?.Actors}</IonLabel>
                        </IonItem>
                        
                        <IonItem lines='none'>
                            <IonIcon icon={trophyOutline} slot='start' />
                            <IonLabel className='ion-text-wrap'>{information?.Awards}</IonLabel>
                        </IonItem>

                        <p className='ion-padding'>{information?.Plot}</p>

                    </IonContent>
               </IonModal>
            </IonContent>
            <IonFooter>
                <IonButton expand='full' id='open-modal'>Mostrar mais...</IonButton>
            </IonFooter>
        </IonPage>
    );
};

export default Details;