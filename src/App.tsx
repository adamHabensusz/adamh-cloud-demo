import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SideNav,
  SideNavItems,
  SideNavLink,
  Theme,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TextInput,
} from '@carbon/react';
import {
  Notification,
  UserAvatar,
  Home as HomeIcon,
  Catalog,
  Activity,
  List,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Help,
  Settings,
  Menu,
  AiLaunch,
  Asleep,
  Light,
  Close,
  Chat,
  Calendar,
  ChartLine,
  ThumbsUp,
  ThumbsDown,
  Renew,
  SendAlt,
  Microphone,
  OverflowMenuHorizontal,
} from '@carbon/icons-react';
import Home from './Home';
import ProductCatalog from './ProductCatalog';
import Create from './Create';
import Activities from './Activities';
import ResourceList from './ResourceList';
import ResourceDetails from './ResourceDetails';
import './App.scss';

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [userName, setUserName] = useState('Adam Habensusz');
  const [accountId, setAccountId] = useState('124849');
  const [accountName, setAccountName] = useState("Adam Habensusz's Account");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);

  // Collapse side nav when navigating to Create page
  React.useEffect(() => {
    if (location.pathname === '/create') {
      setIsSideNavOpen(false);
    }
  }, [location.pathname]);

  // Reset scroll position to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Theme theme={isDarkMode ? "g100" : "g10"}>
      <HeaderContainer
        render={() => (
          <>
            <Header aria-label="IBM Cloud">
              <Button
                kind="ghost"
                size="lg"
                renderIcon={Menu}
                iconDescription="Menu"
                hasIconOnly
                className="hamburger-menu-btn"
              />
              <HeaderName href="#" prefix="IBM">
                Cloud
              </HeaderName>
              <div className="header-nav-buttons">
                <Button
                  kind="ghost"
                  size="sm"
                  renderIcon={ChevronDown}
                  iconDescription="Account menu"
                >
                  {accountId} · User's Account
                </Button>
                <Button
                  kind="ghost"
                  size="sm"
                  renderIcon={ChevronDown}
                  iconDescription="Resources menu"
                >
                  Resources
                </Button>
              </div>
              <HeaderGlobalBar>
                <HeaderGlobalAction
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  tooltipAlignment="end"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                >
                  {isDarkMode ? <Light size={20} /> : <Asleep size={20} />}
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Help"
                  tooltipAlignment="end"
                >
                  <Help size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Settings"
                  tooltipAlignment="end"
                >
                  <Settings size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Notifications"
                  tooltipAlignment="end"
                >
                  <Notification size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="User profile"
                  tooltipAlignment="end"
                >
                  <UserAvatar size={20} />
                </HeaderGlobalAction>
                <Button
                  kind="ghost"
                  size="lg"
                  renderIcon={AiLaunch}
                  iconDescription="AI Assistant"
                  hasIconOnly
                  className="ai-button"
                  onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
                />
              </HeaderGlobalBar>
            </Header>

            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavOpen}
              isFixedNav
              href="#main-content"
            >
              <SideNavItems>
                <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <SideNavLink renderIcon={HomeIcon} isActive={location.pathname === '/'}>
                    Home
                  </SideNavLink>
                </RouterLink>
                <RouterLink to="/catalog" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <SideNavLink renderIcon={Catalog} isActive={location.pathname === '/catalog'}>
                    Product catalog
                  </SideNavLink>
                </RouterLink>
                <RouterLink to="/activities" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <SideNavLink renderIcon={Activity} isActive={location.pathname === '/activities'}>
                    Activities
                  </SideNavLink>
                </RouterLink>
                <RouterLink to="/resources" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <SideNavLink renderIcon={List} isActive={location.pathname === '/resources'}>
                    Resource list
                  </SideNavLink>
                </RouterLink>
                <div style={{
                  marginTop: 'auto',
                  padding: '1rem',
                  borderTop: '1px solid #e0e0e0',
                  display: 'flex',
                  justifyContent: isSideNavOpen ? 'flex-end' : 'center'
                }}>
                  <Button
                    kind="ghost"
                    size="sm"
                    renderIcon={isSideNavOpen ? ChevronLeft : ChevronRight}
                    iconDescription={isSideNavOpen ? "Collapse navigation" : "Expand navigation"}
                    hasIconOnly
                    onClick={() => setIsSideNavOpen(!isSideNavOpen)}
                  />
                </div>
              </SideNavItems>
            </SideNav>

            {/* AI Side Panel */}
            <div className={`ai-side-panel ${isAiPanelOpen ? 'ai-side-panel--open' : ''}`}>
              <div className="ai-panel-header">
                <div className="ai-panel-header-left">
                  <Button
                    kind="ghost"
                    size="sm"
                    renderIcon={Menu}
                    iconDescription="Menu"
                    hasIconOnly
                  />
                  <h2 className="ai-panel-title">IBM Cloud AI</h2>
                </div>
                <Button
                  kind="ghost"
                  size="sm"
                  renderIcon={Close}
                  iconDescription="Close"
                  hasIconOnly
                  onClick={() => setIsAiPanelOpen(false)}
                />
              </div>

              <Tabs>
                <TabList aria-label="AI Panel tabs" contained>
                  <Tab renderIcon={Chat}>Chat</Tab>
                  <Tab renderIcon={Calendar}>Calendar</Tab>
                  <Tab renderIcon={ChartLine}>Chart</Tab>
                  <Tab renderIcon={Help}>Help</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <div className="ai-chat-content">
                      <div className="ai-message">
                        <div className="ai-message-avatar">
                          <AiLaunch size={20} />
                        </div>
                        <div className="ai-message-content">
                          <div className="ai-message-header">
                            <span className="ai-message-sender">IBM Cloud AI</span>
                            <span className="ai-message-time">12:46</span>
                          </div>
                          <div className="ai-message-text">
                            <p>Hi! I'm Finn, an AI-powered agent for IBM Cloud.</p>
                            <p>I can answer questions, help you understand your infrastructure, or even help you make new things.</p>
                            <p>What can I do for you today?</p>
                          </div>
                          <div className="ai-message-actions">
                            <Button
                              kind="ghost"
                              size="sm"
                              renderIcon={ThumbsUp}
                              iconDescription="Like"
                              hasIconOnly
                            />
                            <Button
                              kind="ghost"
                              size="sm"
                              renderIcon={ThumbsDown}
                              iconDescription="Dislike"
                              hasIconOnly
                            />
                            <Button
                              kind="ghost"
                              size="sm"
                              renderIcon={Renew}
                              iconDescription="Regenerate"
                              hasIconOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ai-input-container">
                      <Button
                        kind="ghost"
                        size="sm"
                        renderIcon={Menu}
                        iconDescription="Menu"
                        hasIconOnly
                      />
                      <TextInput
                        id="ai-input"
                        labelText=""
                        placeholder="Type something..."
                        size="lg"
                      />
                      <Button
                        kind="ghost"
                        size="sm"
                        renderIcon={Microphone}
                        iconDescription="Voice input"
                        hasIconOnly
                      />
                      <Button
                        kind="ghost"
                        size="sm"
                        renderIcon={SendAlt}
                        iconDescription="Send"
                        hasIconOnly
                      />
                      <Button
                        kind="ghost"
                        size="sm"
                        renderIcon={OverflowMenuHorizontal}
                        iconDescription="More options"
                        hasIconOnly
                      />
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="ai-panel-content">
                      <p>Calendar content coming soon...</p>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="ai-panel-content">
                      <p>Chart content coming soon...</p>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="ai-panel-content">
                      <p>Help content coming soon...</p>
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>

            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    userName={userName}
                    setUserName={setUserName}
                    accountId={accountId}
                    setAccountId={setAccountId}
                    accountName={accountName}
                    setAccountName={setAccountName}
                  />
                }
              />
              <Route path="/catalog" element={<ProductCatalog />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/resources" element={<ResourceList />} />
              <Route path="/resources/:resourceId" element={<ResourceDetails />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </>
        )}
      />
    </Theme>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

// Made with Bob
