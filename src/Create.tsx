import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Content,
  Grid,
  Column,
  TextInput,
  Toggle,
  Button,
  Tile,
  Theme,
  NumberInput,
  Dropdown,
  Link,
} from '@carbon/react';
import { ArrowLeft, Add } from '@carbon/icons-react';
import ProductDetailsModal from './components/ProductDetailsModal';
import './Create.scss';

const Create: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productName = searchParams.get('product') || 'Service';

  const [instanceName, setInstanceName] = useState('');
  const [region, setRegion] = useState('us-south');
  const [resourceGroup, setResourceGroup] = useState('default');
  const [plan, setPlan] = useState('standard');
  const [workerNodes, setWorkerNodes] = useState(2);
  const [enableMonitoring, setEnableMonitoring] = useState(true);
  const [enableBackup, setEnableBackup] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const regions = [
    { id: 'us-south', text: 'Dallas (us-south)' },
    { id: 'us-east', text: 'Washington DC (us-east)' },
    { id: 'eu-gb', text: 'London (eu-gb)' },
    { id: 'eu-de', text: 'Frankfurt (eu-de)' },
    { id: 'jp-tok', text: 'Tokyo (jp-tok)' },
    { id: 'au-syd', text: 'Sydney (au-syd)' },
  ];

  const plans = [
    { id: 'lite', text: 'Lite - Free' },
    { id: 'standard', text: 'Standard - $0.11/hour' },
    { id: 'premium', text: 'Premium - $0.25/hour' },
  ];

  const resourceGroups = [
    { id: 'default', text: 'Default' },
    { id: 'production', text: 'Production' },
    { id: 'development', text: 'Development' },
    { id: 'testing', text: 'Testing' },
  ];

  const handleCreate = () => {
    // Handle instance creation
    console.log('Creating instance:', {
      instanceName,
      region,
      resourceGroup,
      plan,
      workerNodes,
      enableMonitoring,
      enableBackup,
    });
    // Navigate back to catalog or home after creation
    navigate('/catalog');
  };

  return (
    <Content id="main-content">
      <div className="create-page">
        <Theme theme="white">
          <div className="page-header">
            <div className="page-header-content">
              <Grid fullWidth narrow>
                <Column lg={16} md={8} sm={4}>
                  <div className="create-header">
                    <Button
                      kind="ghost"
                      size="sm"
                      renderIcon={ArrowLeft}
                      onClick={() => navigate('/catalog')}
                    >
                      Back to catalog
                    </Button>
                    <h1 className="create-title">Create {productName}</h1>
                    <p className="create-description">
                      Configure and deploy your {productName} instance
                    </p>
                    <Link
                      href="#"
                      className="learn-more-link"
                      onClick={(e) => {
                        e.preventDefault();
                        setModalOpen(true);
                      }}
                    >
                      View product details
                    </Link>
                  </div>
                </Column>
              </Grid>
            </div>
          </div>
        </Theme>

        <Theme theme="g10">
          <Grid fullWidth narrow>
            <Column lg={{ span: 12, offset: 2 }} md={8} sm={4}>
              <div className="page-content">
                <Grid fullWidth narrow>
                  <Column lg={7} md={6} sm={4}>
                    <div className="create-form">
                      <Tile className="form-section">
                        <h3 className="section-title">Instance details</h3>
                        <Theme theme="white">
                          <div className="form-fields">
                            <TextInput
                            id="instance-name"
                            labelText="Instance name"
                            placeholder="my-instance"
                            value={instanceName}
                            onChange={(e) => setInstanceName(e.target.value)}
                            helperText="Enter a unique name for your instance"
                          />

                          <Dropdown
                            id="resource-group"
                            titleText="Resource group"
                            label="Select resource group"
                            items={resourceGroups}
                            itemToString={(item) => item?.text || ''}
                            selectedItem={resourceGroups.find(rg => rg.id === resourceGroup)}
                            onChange={({ selectedItem }) => setResourceGroup(selectedItem?.id || 'default')}
                            />
                          </div>
                        </Theme>
                      </Tile>

                      <Tile className="form-section">
                        <h3 className="section-title">Location</h3>
                        <Theme theme="white">
                          <div className="form-fields">
                            <Dropdown
                            id="region"
                            titleText="Region"
                            label="Select region"
                            items={regions}
                            itemToString={(item) => item?.text || ''}
                            selectedItem={regions.find(r => r.id === region)}
                            onChange={({ selectedItem }) => setRegion(selectedItem?.id || 'us-south')}
                            helperText="Choose the geographic location for your instance"
                            />
                          </div>
                        </Theme>
                      </Tile>

                      <Tile className="form-section">
                        <h3 className="section-title">Plan</h3>
                        <Theme theme="white">
                          <div className="form-fields">
                            <Dropdown
                            id="plan"
                            titleText="Pricing plan"
                            label="Select plan"
                            items={plans}
                            itemToString={(item) => item?.text || ''}
                            selectedItem={plans.find(p => p.id === plan)}
                            onChange={({ selectedItem }) => setPlan(selectedItem?.id || 'standard')}
                          />

                          <NumberInput
                            id="worker-nodes"
                            label="Worker nodes"
                            helperText="Number of worker nodes for your cluster"
                            min={1}
                            max={10}
                            value={workerNodes}
                            onChange={(e, { value }) => setWorkerNodes(value as number)}
                            />
                          </div>
                        </Theme>
                      </Tile>

                      <Tile className="form-section">
                        <h3 className="section-title">Additional options</h3>
                        <Theme theme="white">
                          <div className="form-fields">
                            <Toggle
                            id="enable-monitoring"
                            labelText="Enable monitoring"
                            labelA="Off"
                            labelB="On"
                            toggled={enableMonitoring}
                            onToggle={(checked) => setEnableMonitoring(checked)}
                          />

                          <Toggle
                            id="enable-backup"
                            labelText="Enable automatic backup"
                            labelA="Off"
                            labelB="On"
                            toggled={enableBackup}
                            onToggle={(checked) => setEnableBackup(checked)}
                            />
                          </div>
                        </Theme>
                      </Tile>
                    </div>
                  </Column>

                  <Column lg={4} md={2} sm={4}>
                    <div className="create-sidebar">
                      <Tile className="summary-tile">
                        <h3 className="summary-title">Summary</h3>
                        <div className="summary-content">
                          <div className="summary-item">
                            <span className="summary-label">Product:</span>
                            <span className="summary-value">{productName}</span>
                          </div>
                          <div className="summary-item">
                            <span className="summary-label">Plan:</span>
                            <span className="summary-value">
                              {plans.find(p => p.id === plan)?.text || 'Standard'}
                            </span>
                          </div>
                          <div className="summary-item">
                            <span className="summary-label">Region:</span>
                            <span className="summary-value">
                              {regions.find(r => r.id === region)?.text || 'Dallas'}
                            </span>
                          </div>
                          <div className="summary-item">
                            <span className="summary-label">Worker nodes:</span>
                            <span className="summary-value">{workerNodes}</span>
                          </div>
                          <div className="summary-divider" />
                          <div className="summary-item summary-total">
                            <span className="summary-label">Estimated cost:</span>
                            <span className="summary-value">
                              ${(workerNodes * 0.11).toFixed(2)}/hour
                            </span>
                          </div>
                        </div>
                        
                        <Button
                          kind="primary"
                          renderIcon={Add}
                          onClick={handleCreate}
                          disabled={!instanceName}
                          className="create-button"
                        >
                          Create instance
                        </Button>
                      </Tile>

                      <Tile className="info-tile">
                        <h4 className="info-title">Need help?</h4>
                        <p className="info-text">
                          Review our documentation or contact support for assistance with creating your instance.
                        </p>
                        <Button kind="tertiary" size="sm">
                          View documentation
                        </Button>
                      </Tile>
                    </div>
                  </Column>
                </Grid>
              </div>
            </Column>
          </Grid>
        </Theme>
      </div>

      <ProductDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={productName}
        hideCreateButton={true}
      />
    </Content>
  );
};

export default Create;

// Made with Bob