//@ts-nocheck
import React, { useState, createRef } from 'react';
import ReactDOM from 'react-dom';
import { config } from './config';
import { getAirgap } from './init';
import Button from './Button/Button';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch';
import './ui.css';

let initialized = false;
// UI root node in DOM
let root: Element | undefined;

const setupConsentManagerUI = async (): Promise<void> => {
  console.log('Initializing Consent Manager UI...');

  const airgap = await getAirgap();
  console.log('Purpose types config: ariannas', airgap.getPurposeTypes());
  console.log('Consent Manager UI config:n ariannas', config.name);
  console.log('Consent Manager UI config:n ariannas', JSON.toString(config));

  // TODO: Setup your consent manager UI DOM here
  const App: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // this.#containerRef = createRef();

    // const handleOutsideClick = (e: MouseEvent) => {
    //   if (
    //     this.#containerRef.current &&
    //     !this.#containerRef.current.contains(e.target as Node)
    //   ) {
    //     setisOpen(false)
    //   }
    // };

    const reasonArray = [];
    const obj = airgap.getPurposeTypes();
    for (const reason in obj) {
      console.log(reason);
      reasonArray.push(reason);
    }
    console.log({ reasonArray });
    reasonArray.map((r) => {
      console.log({ r });
    });
    console.log(obj, 'where is this????');
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
              {reasonArray.map((r) => {
                <p>{r}</p>;
              })}
            </p>
          </h3>
          <pre>{JSON.stringify(airgap.getPurposeTypes(), null, 2)}</pre>
          <h3>Consent Manager UI config</h3>
          <pre>{JSON.stringify(config, null, 2)}</pre>
          <div className="switch-container">
            <ToggleSwitch label={'Functional'} />
            <ToggleSwitch label={'Analytics'} />
            <ToggleSwitch label={'Advertising'} />
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
