import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Content,
  Tile,
  Button,
  Link,
  StructuredListWrapper,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  Modal,
  TextInput,
  Form,
  Stack,
  Grid,
  Column,
  Tag,
} from '@carbon/react';
import {
  Cube,
  Code,
  WatsonHealth3DCursor,
  Gateway,
  DataBase,
  VirtualMachine,
  Network_3,
  WarningAlt,
  Misuse,
  Edit,
  OverflowMenuVertical,
  Add,
  ChevronRight,
  CaretDown,
  InProgress,
  Activity,
  Catalog,
  Deploy,
  Document,
  Settings,
  Renew,
} from '@carbon/icons-react';
import ChatField from './components/ChatField';

interface HomeProps {
  userName: string;
  setUserName: (name: string) => void;
  accountId: string;
  setAccountId: (id: string) => void;
  accountName: string;
  setAccountName: (name: string) => void;
}

const Home: React.FC<HomeProps> = ({
  userName,
  setUserName,
  accountId,
  setAccountId,
  accountName,
  setAccountName,
}) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempUserName, setTempUserName] = useState(userName);
  const [tempAccountId, setTempAccountId] = useState(accountId);
  const [tempAccountName, setTempAccountName] = useState(accountName);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const handleFilterToggle = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleOpenEditModal = () => {
    setTempUserName(userName);
    setTempAccountId(accountId);
    setTempAccountName(accountName);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = () => {
    setUserName(tempUserName);
    setAccountId(tempAccountId);
    setAccountName(tempAccountName);
    setIsEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  return (
    <Content id="main-content">
      <div className="dashboard-container">
        {/* Welcome Section */}
        <div className="welcome-section-wrapper">
          <div className="welcome-section">
            <div className="welcome-content">
            <Grid fullWidth narrow>
              <Column lg={16} md={8} sm={4}>
                <div className="welcome-header-new">
                  <div className="welcome-left">
                    <p className="welcome-text">Welcome,</p>
                    <div className="user-name-container">
                      <h1 className="user-name">{userName}</h1>
                      <Button
                        kind="ghost"
                        size="sm"
                        renderIcon={Edit}
                        iconDescription="Edit name"
                        hasIconOnly
                        onClick={handleOpenEditModal}
                      />
                    </div>
                  </div>
                  <div className="status-cards-horizontal">
                    <div className="status-card-inline">
                      <span className="status-label">Issues</span>
                      <div className="status-value-inline">
                        <Misuse size={20} style={{ color: '#da1e28' }} />
                        <span className="status-number">2</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                    <div className="status-card-inline">
                      <span className="status-label">Cloud incidents</span>
                      <div className="status-value-inline">
                        <WarningAlt size={20} style={{ color: '#f1c21b' }} />
                        <span className="status-number">2</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                    <div className="status-card-inline">
                      <span className="status-label">Maintenance</span>
                      <div className="status-value-inline">
                        <span className="status-number">2</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </Column>

              {/* AI Search */}
              <Column lg={8} md={8} sm={4}>
                <div className="ai-search-container">
                  <ChatField
                    placeholder="Chat with IBM Cloud AI"
                    labelText="AI Search"
                    id="ai-search"
                    onChange={() => {}}
                    onKeyDown={() => {}}
                    onSend={() => {}}
                    onVoiceInput={() => {}}
                  />
                </div>
              </Column>
            </Grid>

            {/* Information Cards Row */}
            <Grid fullWidth narrow>
              <Column lg={4} md={4} sm={4}>
                <div className="info-card">
                  <h3 className="card-title">New feature</h3>
                  <p className="card-description">
                    IBM Cloud is now AI-first. Run an AI task with your IBM Cloud account.
                  </p>
                  <Link href="#">Learn more</Link>
                </div>
              </Column>
              <Column lg={4} md={4} sm={4}>
                <div className="info-card">
                  <h3 className="card-title">Available promotions</h3>
                  <p className="card-description">
                    Get 60% off your Virtual Server for VPC for 12 months
                  </p>
                  <Link href="#">View promotions</Link>
                </div>
              </Column>
              <Column lg={4} md={4} sm={4}>
                <div className="info-card">
                  <h3 className="card-title">Latest news</h3>
                  <p className="card-description">
                    IBM Elects Ramon L. Laguarta to Its Board of Directors
                  </p>
                  <Link href="#">View all news</Link>
                </div>
              </Column>
              <Column lg={4} md={4} sm={4}>
                <div className="info-card">
                  <h3 className="card-title">Learning</h3>
                  <p className="card-description">
                    Explore essential features for creating your virtual server on IBM Cloud VPC.
                  </p>
                  <Link href="#">Explore</Link>
                </div>
              </Column>
            </Grid>
          </div>
        </div>
      </div>

        {/* Page Content Container */}
        <div className="page-content">
          <Grid fullWidth narrow>
            {/* Shortcuts Section */}
            <Column lg={16} md={8} sm={4}>
              <div className="shortcuts-section">
                <h2 className="section-title">Shortcuts</h2>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', marginBottom: '1rem' }}>
                  <Tag
                    type={selectedFilter === 'all' ? 'high-contrast' : 'outline'}
                    onClick={() => handleFilterToggle('all')}
                    style={{ cursor: 'pointer' }}
                  >
                    Getting started
                  </Tag>
                  <Tag
                    type={selectedFilter === 'pinned' ? 'high-contrast' : 'outline'}
                    onClick={() => handleFilterToggle('pinned')}
                    style={{ cursor: 'pointer' }}
                  >
                    Pinned (4)
                  </Tag>
                  <Tag
                    type={selectedFilter === 'products' ? 'high-contrast' : 'outline'}
                    onClick={() => handleFilterToggle('products')}
                    style={{ cursor: 'pointer' }}
                  >
                    My products (16)
                  </Tag>
                </div>
              </div>
            </Column>
            
            {selectedFilter === 'all' && (
              <>
                <Column lg={4} md={4} sm={4}>
                  <Tile className="getting-started-tile">
                    <Cube size={24} className="tile-icon" />
                    <h3 className="tile-title">Create your first resource</h3>
                    <p className="tile-description">
                      Resources are on-demand services created and managed in the cloud.
                    </p>
                  </Tile>
                </Column>
                <Column lg={4} md={4} sm={4}>
                  <Tile className="getting-started-tile">
                    <Catalog size={24} className="tile-icon" />
                    <h3 className="tile-title">Explore our product catalog</h3>
                    <p className="tile-description">
                      Discover our industry leading products and solutions.
                    </p>
                  </Tile>
                </Column>
                <Column lg={4} md={4} sm={4}>
                  <Tile className="getting-started-tile">
                    <Deploy size={24} className="tile-icon" />
                    <h3 className="tile-title">Deploy deployable architectures</h3>
                    <p className="tile-description">
                      Explore pre-built compositions of products that work together.
                    </p>
                  </Tile>
                </Column>
                <Column lg={4} md={4} sm={4}>
                  <Tile className="getting-started-tile">
                    <Document size={24} className="tile-icon" />
                    <h3 className="tile-title">IBM Cloud documentation</h3>
                    <p className="tile-description">
                      Visit the IBM Cloud Docs page to help you get started in the right direction.
                    </p>
                  </Tile>
                </Column>
              </>
            )}

            {selectedFilter === 'pinned' && (
              <>
                <Column lg={4} md={4} sm={4}>
                  <Tile className="getting-started-tile">
                    <Settings size={24} className="tile-icon" />
                    <h3 className="tile-title">Billing and usage</h3>
                    <p className="tile-description">
                      
                    </p>
                  </Tile>
                </Column>
                <Column lg={4} md={4} sm={4}>
                  <Tile className="getting-started-tile">
                    <Settings size={24} className="tile-icon" />
                    <h3 className="tile-title">Access (IAM)</h3>
                    <p className="tile-description">
                      
                    </p>
                  </Tile>
                </Column>
                <Column lg={4} md={4} sm={4}>
                  <Tile className="getting-started-tile">
                    <Renew size={24} className="tile-icon" />
                    <h3 className="tile-title">cluster01</h3>
                    <p className="tile-description">
                      Working nodes
                    </p>
                  </Tile>
                </Column>
                <Column lg={4} md={4} sm={4}>
                  <Tile className="getting-started-tile">
                    <Renew size={24} className="tile-icon" />
                    <h3 className="tile-title">cluster0115</h3>
                    <p className="tile-description">
                      Ingress
                    </p>
                  </Tile>
                </Column>
              </>
            )}

            {selectedFilter === 'products' && (
              <>
                <Column lg={2} md={2} sm={2}>
              <Tile className="shortcut-tile">
                <Cube size={24} />
                <div className="shortcut-info">
                  <span className="shortcut-name">Containers</span>
                  <span className="shortcut-count">5 resources</span>
                </div>
              </Tile>
            </Column>
            <Column lg={2} md={2} sm={2}>
              <Tile className="shortcut-tile">
                <Code size={24} />
                <div className="shortcut-info">
                  <span className="shortcut-name">Code Engine</span>
                  <span className="shortcut-count">5 resources</span>
                </div>
              </Tile>
            </Column>
            <Column lg={2} md={2} sm={2}>
              <Tile className="shortcut-tile">
                <WatsonHealth3DCursor size={24} />
                <div className="shortcut-info">
                  <span className="shortcut-name">watsonx</span>
                  <span className="shortcut-count">5 resources</span>
                </div>
              </Tile>
            </Column>
            <Column lg={2} md={2} sm={2}>
              <Tile className="shortcut-tile">
                <Gateway size={24} />
                <div className="shortcut-info">
                  <span className="shortcut-name">Transit Gateway</span>
                  <span className="shortcut-count">5 resources</span>
                </div>
              </Tile>
            </Column>
            <Column lg={2} md={2} sm={2}>
              <Tile className="shortcut-tile">
                <DataBase size={24} />
                <div className="shortcut-info">
                  <span className="shortcut-name">Block Storage for VPC</span>
                  <span className="shortcut-count">5 resources</span>
                </div>
              </Tile>
            </Column>
            <Column lg={2} md={2} sm={2}>
              <Tile className="shortcut-tile">
                <DataBase size={24} />
                <div className="shortcut-info">
                  <span className="shortcut-name">Databases</span>
                  <span className="shortcut-count">5 resources</span>
                </div>
              </Tile>
            </Column>
            <Column lg={2} md={2} sm={2}>
              <Tile className="shortcut-tile">
                <VirtualMachine size={24} />
                <div className="shortcut-info">
                  <span className="shortcut-name">File Storage for VPC</span>
                  <span className="shortcut-count">5 resources</span>
                </div>
              </Tile>
            </Column>
            <Column lg={2} md={2} sm={2}>
              <Tile className="shortcut-tile">
                <Network_3 size={24} />
                <div className="shortcut-info">
                  <span className="shortcut-name">VMware Solutions</span>
                  <span className="shortcut-count">5 resources</span>
                </div>
              </Tile>
            </Column>
              </>
            )}

            {/* Main Content Grid */}
            <Column lg={16} md={8} sm={4}>
              <h2 className="jump-back-in-title">Jump back in</h2>
            </Column>

            {/* Recently Visited */}
            <Column lg={12} md={8} sm={4}>
              <div className="recently-visited">
                <div className="section-header">
                  <h2 className="section-title">Recently visited</h2>
                  <div className="section-header-actions">
                    <Button
                      kind="ghost"
                      size="lg"
                      renderIcon={OverflowMenuVertical}
                      iconDescription="View all"
                      hasIconOnly
                    />
                    <Button
                      kind="primary"
                      size="lg"
                      renderIcon={Add}
                      iconDescription="Add"
                      hasIconOnly
                      onClick={() => navigate('/catalog')}
                    />
                  </div>
                </div>
                <StructuredListWrapper>
                  <StructuredListBody>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <VirtualMachine size={20} />
                          <span>IBM VCFaaS Multitenant - DAL</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>VCF as a Service - Cloud Director Site</StructuredListCell>
                      <StructuredListCell>
                        <ChevronRight size={16} />
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <DataBase size={20} />
                          <span>pio-migration-classic-to-vpc</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>DNS services</StructuredListCell>
                      <StructuredListCell>
                        <ChevronRight size={16} />
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Cube size={20} />
                          <span>pgw-1e9fa90b-faa6-11ef-b793-397dbed...</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>Virtual Private Endpoint for VPC</StructuredListCell>
                      <StructuredListCell>
                        <ChevronRight size={16} />
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Code size={20} />
                          <span>my-website</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>Security Group for VPC</StructuredListCell>
                      <StructuredListCell>
                        <ChevronRight size={16} />
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <DataBase size={20} />
                          <span>containers-cluster1</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>Load Balancer Endpoint for VPC</StructuredListCell>
                      <StructuredListCell>
                        <ChevronRight size={16} />
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Activity size={20} />
                          <span>Project 1</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>Red Hat Openshift on IBM Cloud</StructuredListCell>
                      <StructuredListCell>
                        <ChevronRight size={16} />
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <DataBase size={20} />
                          <span>cos-observe-storage</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>Vmware Solutions</StructuredListCell>
                      <StructuredListCell>
                        <ChevronRight size={16} />
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Code size={20} />
                          <span>pgw-1e9fa90b-faa6-11ef-b793-397dbed...</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>Code Engine</StructuredListCell>
                      <StructuredListCell>
                        <ChevronRight size={16} />
                      </StructuredListCell>
                    </StructuredListRow>
                  </StructuredListBody>
                </StructuredListWrapper>
                <div className="card-footer">
                  <Link href="#">View all resources</Link>
                </div>
              </div>
            </Column>

            {/* Recent Chats */}
            <Column lg={4} md={8} sm={4}>
              <div className="recent-chats">
                <div className="section-header">
                  <h2 className="section-title">Recent chats</h2>
                  <Button
                    kind="ghost"
                    size="lg"
                    renderIcon={OverflowMenuVertical}
                    iconDescription="More options"
                    hasIconOnly
                  />
                </div>
                <StructuredListWrapper>
                  <StructuredListBody>
                    <StructuredListRow>
                      <StructuredListCell>Compare resource distribution</StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>Timeline of performance degradation</StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>Generate a billing anomaly report</StructuredListCell>
                    </StructuredListRow>
                  </StructuredListBody>
                </StructuredListWrapper>
                <div className="card-footer">
                  <Link href="#">View all chats</Link>
                </div>
              </div>
            </Column>

            {/* Control Center Section */}
            <Column lg={16} md={8} sm={4}>
              <h2 className="control-center-title">Control center</h2>
            </Column>

            {/* Month-to-date usage */}
            <Column lg={8} md={8} sm={4}>
              <div className="control-card">
                <div className="control-card-header">
                  <h3 className="control-card-title">Month-to-date usage</h3>
                  <div className="control-card-actions">
                    <Button kind="ghost" size="lg" renderIcon={Add} iconDescription="Add" hasIconOnly />
                    <Button kind="ghost" size="lg" renderIcon={OverflowMenuVertical} iconDescription="More options" hasIconOnly />
                  </div>
                </div>
                <div className="control-card-content">
                  <div className="usage-amount">
                    <CaretDown size={20} style={{ color: '#24a148' }} />
                    <span className="amount">$1,258.58</span>
                    <span className="period">/month</span>
                  </div>
                  <div className="chart-placeholder">
                    <svg width="100%" height="120" viewBox="0 0 700 120" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#a6c8ff', stopOpacity: 0.4 }} />
                          <stop offset="100%" style={{ stopColor: '#a6c8ff', stopOpacity: 0 }} />
                        </linearGradient>
                      </defs>
                      <path d="M 0,80 L 50,75 L 100,78 L 150,70 L 200,65 L 250,40 L 300,25 L 350,15 L 400,30 L 450,45 L 500,50 L 550,55 L 600,60 L 650,65 L 700,70 L 700,120 L 0,120 Z" fill="url(#areaGradient)" />
                      <path d="M 0,80 L 50,75 L 100,78 L 150,70 L 200,65 L 250,40 L 300,25 L 350,15 L 400,30 L 450,45 L 500,50 L 550,55 L 600,60 L 650,65 L 700,70" fill="none" stroke="#a6c8ff" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div className="control-card-footer">
                  <Link href="#">Go to Billing and usage</Link>
                </div>
              </div>
            </Column>

            {/* Active support tickets */}
            <Column lg={4} md={8} sm={4}>
              <div className="control-card">
                <div className="control-card-header">
                  <h3 className="control-card-title">Active support tickets</h3>
                  <div className="control-card-actions">
                    <Button kind="ghost" size="lg" renderIcon={Add} iconDescription="Add" hasIconOnly />
                    <Button kind="ghost" size="lg" renderIcon={OverflowMenuVertical} iconDescription="More options" hasIconOnly />
                  </div>
                </div>
                <div className="control-card-content">
                  <div className="ticket-count">2</div>
                </div>
                <StructuredListWrapper>
                  <StructuredListBody>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <InProgress size={16} style={{ color: '#0043ce' }} />
                          <span>Severity 4: Order tracking for BM classic</span>
                        </div>
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <InProgress size={16} style={{ color: '#0043ce' }} />
                          <span>Severity 4: Order tracking for BM classic</span>
                        </div>
                      </StructuredListCell>
                    </StructuredListRow>
                  </StructuredListBody>
                </StructuredListWrapper>
                <div className="control-card-footer">
                  <Link href="#">Go to Support</Link>
                </div>
              </div>
            </Column>

            {/* Planned maintenance */}
            <Column lg={4} md={8} sm={4}>
              <div className="control-card">
                <div className="control-card-header">
                  <h3 className="control-card-title">Planned maintenance</h3>
                  <Button kind="ghost" size="lg" renderIcon={OverflowMenuVertical} iconDescription="More options" hasIconOnly />
                </div>
                <div className="control-card-content">
                  <div className="maintenance-count">2</div>
                </div>
                <StructuredListWrapper>
                  <StructuredListBody>
                    <StructuredListRow>
                      <StructuredListCell>Basic monitoring and bandwidth services mainten...</StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>Basic monitoring and bandwidth services mainten...</StructuredListCell>
                    </StructuredListRow>
                  </StructuredListBody>
                </StructuredListWrapper>
                <div className="control-card-footer">
                  <Link href="#">View all</Link>
                </div>
              </div>
            </Column>

            {/* Recent Activities */}
            <Column lg={16} md={8} sm={4}>
              <div className="recent-activities">
                <div className="section-header">
                  <h2 className="section-title">Recent activities</h2>
                  <div className="activities-actions">
                    <Button
                      kind="ghost"
                      size="lg"
                      renderIcon={OverflowMenuVertical}
                      iconDescription="More options"
                      hasIconOnly
                    />
                  </div>
                </div>
                <StructuredListWrapper>
                  <StructuredListBody>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Misuse size={20} style={{ color: '#da1e28' }} />
                          <span>A cluster in "Resource 1" has lost networking to an application server</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>
                        <span style={{ color: '#525252', fontSize: '0.875rem' }}>February 28, 2026 5:00 AM</span>
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Misuse size={20} style={{ color: '#da1e28' }} />
                          <span>"Resource 2" has lost connection to the server</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>
                        <span style={{ color: '#525252', fontSize: '0.875rem' }}>February 28, 2026 5:00 AM</span>
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <WarningAlt size={20} style={{ color: '#f1c21b' }} />
                          <span>Storage capacity in "Resource 3" is running low</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>
                        <span style={{ color: '#525252', fontSize: '0.875rem' }}>February 28, 2026 5:00 AM</span>
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Activity size={20} style={{ color: '#525252' }} />
                          <span>A cluster in "Resource 1" has lost networking to an application server</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>
                        <span style={{ color: '#525252', fontSize: '0.875rem' }}>February 28, 2026 5:00 AM</span>
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Activity size={20} style={{ color: '#525252' }} />
                          <span>"automate cluster creation" task has been scheduled</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>
                        <span style={{ color: '#525252', fontSize: '0.875rem' }}>February 28, 2026 5:00 AM</span>
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <InProgress size={20} style={{ color: '#0f62fe' }} />
                          <span>cluster03 is being created</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>
                        <span style={{ color: '#525252', fontSize: '0.875rem' }}>February 28, 2026 5:00 AM</span>
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <InProgress size={20} style={{ color: '#0f62fe' }} />
                          <span>cluster04 is being deleted</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>
                        <span style={{ color: '#525252', fontSize: '0.875rem' }}>February 28, 2026 5:00 AM</span>
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <InProgress size={20} style={{ color: '#0f62fe' }} />
                          <span>prod-test-tgw is being deleted</span>
                        </div>
                      </StructuredListCell>
                      <StructuredListCell>
                        <span style={{ color: '#525252', fontSize: '0.875rem' }}>February 28, 2026 5:00 AM</span>
                      </StructuredListCell>
                    </StructuredListRow>
                  </StructuredListBody>
                </StructuredListWrapper>
                <div className="card-footer">
                  <Link href="#">Go to Activities</Link>
                </div>
              </div>
            </Column>
          </Grid>
        </div>
      </div>

      {/* Edit Details Modal */}
      <Modal
        open={isEditModalOpen}
        onRequestClose={handleCancelEdit}
        onRequestSubmit={handleSaveChanges}
        modalHeading="Edit account details"
        modalLabel="Account Settings"
        primaryButtonText="Save changes"
        secondaryButtonText="Cancel"
        size="sm"
      >
        <Form>
          <Stack gap={6}>
            <TextInput
              id="user-name-input"
              labelText="User name"
              placeholder="Enter your name"
              value={tempUserName}
              onChange={(e) => setTempUserName(e.target.value)}
            />
            <TextInput
              id="account-id-input"
              labelText="Account ID"
              placeholder="Enter account ID"
              value={tempAccountId}
              onChange={(e) => setTempAccountId(e.target.value)}
            />
            <TextInput
              id="account-name-input"
              labelText="Account name"
              placeholder="Enter account name"
              value={tempAccountName}
              onChange={(e) => setTempAccountName(e.target.value)}
            />
          </Stack>
        </Form>
      </Modal>
    </Content>
  );
};

export default Home;

// Made with Bob
