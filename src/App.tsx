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
} from '@carbon/icons-react';
import Home from './Home';
import ProductCatalog from './ProductCatalog';
import Create from './Create';
import Activities from './Activities';
import ResourceList from './ResourceList';
import './App.scss';

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [userName, setUserName] = useState('Adam Habensusz');
  const [accountId, setAccountId] = useState('124849');
  const [accountName, setAccountName] = useState("Adam Habensusz's Account");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Collapse side nav when navigating to Create page
  React.useEffect(() => {
    if (location.pathname === '/create') {
      setIsSideNavOpen(false);
    }
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
