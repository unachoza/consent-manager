import React from 'react';
import ReactDOM from 'react-dom';
import { config } from './config';
import { getAirgap } from './init';
import './ui.css';

let initialized = false;
// UI root node in DOM
let root: Element | undefined;

const setupConsentManagerUI = async (): Promise<void> => {
  console.log('Initializing Consent Manager UI...');

  const airgap = await getAirgap();
  console.log('Purpose types config:', airgap.getPurposeTypes());
  console.log('Consent Manager UI config:', config);

  // TODO: Setup your consent manager UI DOM here
  const App: React.FC = () => {
    return (
      <>
        <section>
          <header>
            <h2>Consent Manager</h2>
          </header>
          <p>
            Edit <code>src/ui/ui.tsx</code> and save to reload.
          </p>
          <h3>
            Current tracking purpose consent
          </h3>
          <pre>
            {JSON.stringify(airgap.getConsent(), null, 2)}
          </pre>
          <h3>
            Tracking purpose types
          </h3>
          <pre>
            {JSON.stringify(airgap.getPurposeTypes(), null, 2)}
          </pre>
          <h3>
          Consent Manager UI config
          </h3>
          <pre>
            {JSON.stringify(config, null, 2)}
          </pre>
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
    root
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
