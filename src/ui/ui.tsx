//@ts-nocheck
import React, { useState, createRef } from 'react';
import ReactDOM from 'react-dom';
import { config } from './config';
import { getAirgap } from './init';
import Button from './Button/Button';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch';
import Tooltip from './Tooltip/Tooltip';
import './ui.css';
import Popup from './Popup/Popup';

let initialized = false;
// UI root node in DOM
let root: Element | undefined;

const setupConsentManagerUI = async (): Promise<void> => {
  console.log('Initializing Consent Manager UI...');

  const airgap = await getAirgap();
  const massiveObj = airgap.getPurposeTypes();
  console.log(
    'Purpose types config: ariannas',
    massiveObj.Parkinsons_Cursor_Tracking.name,
  );
  console.log('Consent Manager UI config:n ariannas', config.name);
  // console.log('Consent Manager UI config:n ariannas', JSON.toString(config));
  const consentObj = airgap.getConsent();
  console.log({ consentObj });
  const obj = airgap.getPurposeTypes();
  console.log('this here' , obj)

  const shapeData = (input: any, normalizedDataShape: any) => {
    console.log(input.length, input)
  //   let shapedData = [];
  //   for (let el of input) {
  //    shapedData.push(normalizedDataShape(el));
  //  }
  //  return shapedData;
   };
  const normalizeData = (data) => ({
    configurable: massiveObj[key].configurable,
    defaultConsent: massiveObj[key].defaultConsent,
    explicitConsent: false,
    description: massiveObj[key].description,
    essential: massiveObj[key].essential,
    name: massiveObj[key].name,
    showInConsentManager: massiveObj[key].showInConsentManager,
  });
  const betterData = shapeData(obj, normalizeData)
  console.log({betterData});

  const INITIAL_STATE = consentObj;
  // TODO: Setup your consent manager UI DOM here
  const App: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);
    const [consent, setConsent] = useState(INITIAL_STATE);

    const [advertising, setAdvertising] = useState(false);
    // this.#containerRef = createRef();

    // const handleOutsideClick = (e: MouseEvent) => {
    //   if (
    //     this.#containerRef.current &&
    //     !this.#containerRef.current.contains(e.target as Node)
    //   ) {
    //     setisOpen(false)
    //   }
    // };
    const onSwitch = (targetState, newValue) => {
      // set[targetState](newValue)
      this.setState({ checked: newValue });
    };
    const onChange = () => {
      setAdvertising((prevAdvertising) => !prevAdvertising);
    };

    const reasonArray = [];
    // for (const reason in obj) {
    //   console.log(reason);
    //   reasonArray.push(reason);
    // }
    // console.log({ reasonArray });
    // reasonArray.map((r) => {
    //   console.log({ r });
    // });
    // console.log(obj, 'where is this????');
    // {JSON.parse(airgap.getPurposeTypes())}
    return (
      <>
        <section id="container">
          <header>
            <h2>Consent Manager</h2>
          </header>
          <p>
            Edit <code>src/ui/ui.tsx</code> and save to reload.
          </p>
          <h3>Current tracking purpose consent</h3>
          <pre>{JSON.stringify(airgap.getConsent(), null, 2)}</pre>
          <h3>
            Tracking purpose types are all the fuck over the place
            <p>
              {Object.keys(massiveObj).map((key) => {
                console.log(massiveObj[key]);
                return (
                  <div>
                  <ToggleSwitch label={massiveObj[key].name} />
                  <span>
                    {' '}
                    <img
                      src={`https://res.cloudinary.com/dh41vh9dx/image/upload/v1619578173/3946401821543238897.svg`}
                      className="info-icon"
                      alt="information icon"
                      onClick={toggling}
                    />
                    </span>
                    
                    {isOpen && <Tooltip toggling={toggling} text={massiveObj[key].description} />}
                    </div>
                );
              })}
              <strong>{massiveObj.Parkinsons_Cursor_Tracking.name}</strong>
              <p>{massiveObj.Parkinsons_Cursor_Tracking.description}</p>
            </p>
          </h3>
          <pre>{JSON.stringify(airgap.getPurposeTypes(), null, 2)}</pre>
          <h3>Consent Manager UI config</h3>
          <pre>{JSON.stringify(config, null, 2)}</pre>
          <div className="switch-container">
            <div>
              <ToggleSwitch label={'Functional'} />
              <span>
                {' '}
                <img
                  src={`https://res.cloudinary.com/dh41vh9dx/image/upload/v1619578173/3946401821543238897.svg`}
                  className="info-icon"
                  alt="information icon"
                  onClick={toggling}
                />
              </span>

              {isOpen && (
                <Tooltip toggling={toggling} text="informative stuff" />
              )}
            </div>
            <ToggleSwitch label={'Analytics'} />
            {/* <ToggleSwitch label={'Advertising'} value={advertising} key="ad" onChange={onChange}/> */}
            <ToggleSwitch label={'Parkinson Cursor Tracking'} />
          </div>
          <div className="button-container">
            <Button
              text={'Save Preferences'}
              onClick={(e) => console.log('Save clicked')}
            />
            <Button
              text={'Accept All'}
              onClick={(e) => console.log('accept clicked')}
            />
            <Button
              text={'Deny All'}
              onClick={(e) => console.log('deny clicked')}
            />
          </div>
        </section>
      </>
    );
  };

  root = document.createElement('div');
  root.className = 'ConsentManager';
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    root,
  );
  document.body.firstElementChild?.before(root);
  // END: TODO: Setup your consent manager UI DOM here

  initialized = true;
  console.log('Consent Manager UI initialized');
};

const showConsentManagerUI = async () => {
  const airgap = await getAirgap();
  console.log('Current consent:', airgap.getConsent());

  // TODO: Display your consent manager UI here
};

export const showConsentManager = async () => {
  console.log('transcend.showConsentManager() called');
  if (!initialized) {
    await setupConsentManagerUI();
  }
  await showConsentManagerUI();
};
