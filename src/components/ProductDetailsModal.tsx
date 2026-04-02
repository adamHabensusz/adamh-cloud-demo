import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Tabs, TabList, Tab, TabPanels, TabPanel, Button, Link } from '@carbon/react';
import { Network_3, Kubernetes, Security, Earth, Catalog, Add } from '@carbon/icons-react';
import './ProductDetailsModal.scss';

interface ProductDetailsModalProps {
  open: boolean;
  onClose: () => void;
  productName: string;
  productIcon?: React.ComponentType<any>;
  onNextProduct?: () => void;
  onPreviousProduct?: () => void;
  showPreviousButton?: boolean;
  hideCreateButton?: boolean;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  open,
  onClose,
  productName,
  productIcon: IconComponent,
  onNextProduct,
  onPreviousProduct,
  showPreviousButton = false,
  hideCreateButton = false
}) => {
  const navigate = useNavigate();
  const [showMoreTutorials, setShowMoreTutorials] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Match animation duration
  };

  const handleCreateInstance = () => {
    navigate(`/create?product=${encodeURIComponent(productName)}`);
  };

  return (
    <Modal
      open={open}
      onRequestClose={handleClose}
      passiveModal
      size="lg"
      className={`product-details-modal ${isClosing ? 'closing' : ''}`}
    >
      <div className="modal-wrapper">
        <div className="modal-custom-header">
          <div className="modal-title-section">
            <h1 className="modal-title">{productName}</h1>
            <p className="modal-description">
              Enterprise-grade managed service for containerized applications
            </p>
            <Tabs>
              <TabList aria-label="Product details tabs">
                <Tab>About</Tab>
                <Tab>Pricing</Tab>
              </TabList>
            </Tabs>
          </div>
          <div className="modal-header-icon">
            {IconComponent ? <IconComponent size={32} /> : <Network_3 size={32} />}
          </div>
        </div>

        <div className="modal-scrollable-content">
          <Tabs>
            <TabPanels>
              <TabPanel>
                <div className="modal-content">
              <div className="modal-sidebar">
                <div className="sidebar-section">
                  <h4 className="sidebar-title">Best for</h4>
                  <ul className="sidebar-list">
                    <li>Microservices architecture</li>
                    <li>Cloud-native applications</li>
                    <li>DevOps workflows</li>
                    <li>Hybrid cloud deployments</li>
                  </ul>
                </div>

                <div className="sidebar-section">
                  <h4 className="sidebar-title">Compare with</h4>
                  <ul className="sidebar-list">
                    <li>IBM Cloud Kubernetes Service</li>
                    <li>IBM Cloud Code Engine</li>
                    <li>IBM Cloud Satellite</li>
                  </ul>
                </div>

                <div className="sidebar-section">
                  <h4 className="sidebar-title">Available in</h4>
                  <p className="sidebar-text">Dallas, Washington DC, London, Frankfurt, Tokyo, Sydney, and 15+ more regions</p>
                </div>
              </div>

              <div className="modal-main">
                <section className="content-section">
                  <h3 className="section-heading">Summary</h3>
                  <p className="section-text">
                    With {productName}, OpenShift developers have a fast and secure way to containerize and deploy
                    enterprise workloads in Kubernetes clusters. OpenShift clusters build on Kubernetes container orchestration that
                    offers consistency and flexibility in operations. Because IBM manages OpenShift Container Platform (OCP), you'll
                    have more time to focus on your core tasks.
                  </p>
                </section>

                <section className="content-section">
                  <h3 className="section-heading">Features</h3>
                  <div className="features-grid">
                    <div className="feature-item">
                      <div className="feature-icon">
                        <Kubernetes size={32} />
                      </div>
                      <h4 className="feature-title">OpenShift experience built on Kubernetes</h4>
                      <p className="feature-description">
                        Use the OpenShift tools and APIs you already know for a single, consistent experience, even
                        when working across hybrid environments or different cloud providers.
                      </p>
                    </div>
                    <div className="feature-item">
                      <div className="feature-icon">
                        <Security size={32} />
                      </div>
                      <h4 className="feature-title">Heightened cluster and app security</h4>
                      <p className="feature-description">
                        IBM provides security features to protect your cluster infrastructure, isolate your compute
                        resources, encrypt data, and ensure security compliance in your container deployments.
                        Further, OpenShift sets up strict Security Context Constraints for greater pod security
                        by default.
                      </p>
                    </div>
                    <div className="feature-item">
                      <div className="feature-icon">
                        <Earth size={32} />
                      </div>
                      <h4 className="feature-title">Worldwide, continuous availability</h4>
                      <p className="feature-description">
                        Deploy and scale workloads across the globe in all IBM Cloud multizone regions. OpenShift
                        clusters include a managed master that is automatically spread across zones within the
                        region for high availability.
                      </p>
                    </div>
                    <div className="feature-item">
                      <div className="feature-icon">
                        <Catalog size={32} />
                      </div>
                      <h4 className="feature-title">Integrated OpenShift catalog</h4>
                      <p className="feature-description">
                        Quickly set up a CI/CD with Jenkins or deploy a variety of apps in a guided experience that's
                        fully integrated into your OpenShift cluster.
                      </p>
                    </div>
                  </div>
                </section>

                <div className="requirements-tutorials-grid">
                  <section className="content-section">
                    <h3 className="section-heading">Requirements</h3>
                    <ul className="requirements-list">
                      <li>An IBM Cloud account with appropriate permissions</li>
                      <li>IBM Cloud CLI installed and configured</li>
                      <li>OpenShift CLI (oc) version 4.x or later</li>
                      <li>Kubernetes CLI (kubectl) for cluster management</li>
                      <li>Minimum 2 worker nodes with 4 cores and 16GB RAM each</li>
                    </ul>
                  </section>

                  <section className="content-section">
                    <h3 className="section-heading">Tutorials</h3>
                    <ul className="tutorials-list">
                      <li>Getting started with Red Hat OpenShift on IBM Cloud</li>
                      <li>Deploy a containerized application to an OpenShift cluster</li>
                      {showMoreTutorials && (
                        <>
                          <li>Set up continuous integration and delivery with Jenkins</li>
                          <li>Configure auto-scaling for your OpenShift applications</li>
                          <li>Implement security best practices in OpenShift</li>
                          <li>Monitor and troubleshoot OpenShift clusters</li>
                          <li>Migrate applications from Kubernetes to OpenShift</li>
                          <li>Configure persistent storage for stateful applications</li>
                          <li>Set up multi-zone clusters for high availability</li>
                          <li>Integrate OpenShift with IBM Cloud services</li>
                        </>
                      )}
                    </ul>
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowMoreTutorials(!showMoreTutorials);
                      }}
                    >
                      {showMoreTutorials ? 'View less' : 'View 10 more'}
                    </Link>
                  </section>
                </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="modal-content">
                  <p>Pricing information coming soon...</p>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>

      <div className="modal-footer">
        <div className="modal-footer-left">
          {showPreviousButton && onPreviousProduct && (
            <Button kind="ghost" onClick={onPreviousProduct}>
              Previous product
            </Button>
          )}
          {onNextProduct && (
            <Button kind="ghost" onClick={onNextProduct}>
              Next product
            </Button>
          )}
        </div>
        <div className="modal-footer-right">
          <Button kind="ghost" onClick={handleClose}>
            Close
          </Button>
          {!hideCreateButton && (
            <Button kind="primary" renderIcon={Add} onClick={handleCreateInstance}>
              Create instance
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;

// Made with Bob