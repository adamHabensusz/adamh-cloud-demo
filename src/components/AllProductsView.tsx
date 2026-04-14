import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Checkbox,
  Dropdown,
  Tile,
  Column,
  Theme,
  Button,
  Tag
} from '@carbon/react';
import {
  Code,
  Cube,
  CloudApp,
  DataBase,
  VirtualMachine,
  Watson,
  Security,
  DataBackup,
  Deploy,
  Add,
  Information
} from '@carbon/icons-react';
import ProductDetailsModal from './ProductDetailsModal';
import './AllProductsView.scss';

interface Product {
  id: number;
  title: string;
  description: string;
  bestFor: string;
  price: string;
  icon: React.ComponentType<any>;
  categories: string[];
}

interface FilterCategory {
  name: string;
  count: number;
  checked: boolean;
}

interface FilterGroup {
  title: string;
  items: FilterCategory[];
}

const AllProductsView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('lowest-price');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);

  const filterGroups: FilterGroup[] = [
    {
      title: 'Category',
      items: [
        { name: 'Compute', count: 12, checked: true },
        { name: 'Containers', count: 8, checked: false },
        { name: 'Storage', count: 23, checked: false },
        { name: 'Networking', count: 46, checked: false },
        { name: 'Security', count: 26, checked: true },
        { name: 'Data', count: 4, checked: false },
        { name: 'AI / ML', count: 8, checked: false },
        { name: 'Observability', count: 5, checked: false },
        { name: 'Integration', count: 67, checked: false },
        { name: 'Developer tools', count: 34, checked: false },
        { name: 'Migration', count: 5, checked: false },
        { name: 'Industry solutions', count: 3, checked: false },
        { name: 'Test', count: 1, checked: false },
      ]
    }
  ];

  // Product data from Explore page with appropriate icons
  const products: Product[] = [
    {
      id: 1,
      title: 'Code Engine',
      description: 'Run apps and containers serverlessly.',
      bestFor: 'Best for serverless applications',
      price: 'Pay as you go',
      icon: Code,
      categories: ['Compute', 'Containers', 'Developer tools']
    },
    {
      id: 2,
      title: 'Containers',
      description: 'Secure, highly available containers on OpenShift or Kubernetes.',
      bestFor: 'Best for container orchestration',
      price: 'Starts from $0.11/hour',
      icon: Cube,
      categories: ['Containers', 'Compute']
    },
    {
      id: 3,
      title: 'Cloudant',
      description: 'Scalable JSON database for modern apps.',
      bestFor: 'Best for NoSQL database needs',
      price: 'Starts from $0.25/hour',
      icon: DataBase,
      categories: ['Data', 'Storage']
    },
    {
      id: 4,
      title: 'Virtual Server for VPC',
      description: 'High-performance next-gen virtual machines.',
      bestFor: 'Best for compute workloads',
      price: 'Starts from $0.02/hour',
      icon: VirtualMachine,
      categories: ['Compute', 'Networking']
    },
    {
      id: 5,
      title: 'Bare Metal Servers for VPC',
      description: 'Single-tenant x86 servers for end-user virtualization.',
      bestFor: 'Best for dedicated compute',
      price: 'Starts from $1.50/hour',
      icon: VirtualMachine,
      categories: ['Compute']
    },
    {
      id: 6,
      title: 'watsonx.ai',
      description: 'Build, train, and deploy AI models at scale.',
      bestFor: 'Best for AI/ML workloads',
      price: 'Custom pricing',
      icon: Watson,
      categories: ['AI / ML', 'Data']
    },
    {
      id: 7,
      title: 'watsonx.data',
      description: 'Open lakehouse for AI workloads.',
      bestFor: 'Best for data lakehouse',
      price: 'Custom pricing',
      icon: DataBase,
      categories: ['AI / ML', 'Data', 'Storage']
    },
    {
      id: 8,
      title: 'Watson Studio',
      description: 'Build and train AI models collaboratively.',
      bestFor: 'Best for data science teams',
      price: 'Starts from $0.50/hour',
      icon: Watson,
      categories: ['AI / ML', 'Developer tools']
    },
    {
      id: 9,
      title: 'Cloud Object Storage',
      description: 'Scalable, secure object storage for unstructured data.',
      bestFor: 'Best for data storage',
      price: 'Starts from $0.023/GB',
      icon: DataBase,
      categories: ['Storage', 'Data']
    },
    {
      id: 10,
      title: 'Block Storage for VPC',
      description: 'High-performance block storage volumes for VPC instances.',
      bestFor: 'Best for persistent storage',
      price: 'Starts from $0.10/GB',
      icon: DataBase,
      categories: ['Storage', 'Networking']
    },
    {
      id: 11,
      title: 'Db2',
      description: 'Enterprise-grade relational database.',
      bestFor: 'Best for SQL workloads',
      price: 'Starts from $0.36/hour',
      icon: DataBase,
      categories: ['Data', 'Storage']
    },
    {
      id: 12,
      title: 'Databases for PostgreSQL',
      description: 'Managed PostgreSQL database service.',
      bestFor: 'Best for PostgreSQL apps',
      price: 'Starts from $0.03/hour',
      icon: DataBase,
      categories: ['Data', 'Storage']
    },
    {
      id: 13,
      title: 'Databases for MySQL',
      description: 'Managed MySQL database service.',
      bestFor: 'Best for MySQL apps',
      price: 'Starts from $0.03/hour',
      icon: DataBase,
      categories: ['Data', 'Storage']
    },
    {
      id: 14,
      title: 'Databases for MongoDB',
      description: 'Managed MongoDB database service.',
      bestFor: 'Best for document databases',
      price: 'Starts from $0.05/hour',
      icon: DataBase,
      categories: ['Data', 'Storage']
    },
    {
      id: 15,
      title: 'Red Hat OpenShift on IBM Cloud',
      description: 'Fully managed OpenShift service.',
      bestFor: 'Best for Kubernetes apps',
      price: 'Starts from $0.14/hour',
      icon: Cube,
      categories: ['Containers', 'Compute']
    },
    {
      id: 16,
      title: 'Kubernetes Service',
      description: 'Managed Kubernetes clusters.',
      bestFor: 'Best for container orchestration',
      price: 'Starts from $0.11/hour',
      icon: Cube,
      categories: ['Containers', 'Compute']
    },
    {
      id: 17,
      title: 'IBM Cloud Monitoring',
      description: 'Monitor infrastructure and applications.',
      bestFor: 'Best for observability',
      price: 'Starts from $0.08/hour',
      icon: CloudApp,
      categories: ['Observability', 'Developer tools']
    },
    {
      id: 18,
      title: 'IBM Cloud Logs',
      description: 'Centralized logging service.',
      bestFor: 'Best for log management',
      price: 'Starts from $0.50/GB',
      icon: CloudApp,
      categories: ['Observability', 'Developer tools']
    },
    {
      id: 19,
      title: 'API Connect',
      description: 'Create, secure, and manage APIs.',
      bestFor: 'Best for API management',
      price: 'Starts from $0.50/hour',
      icon: CloudApp,
      categories: ['Integration', 'Developer tools']
    },
    {
      id: 20,
      title: 'App Connect',
      description: 'Integration platform as a service.',
      bestFor: 'Best for app integration',
      price: 'Starts from $0.25/hour',
      icon: CloudApp,
      categories: ['Integration', 'Developer tools']
    },
    {
      id: 21,
      title: 'Event Streams',
      description: 'Managed Apache Kafka service.',
      bestFor: 'Best for event streaming',
      price: 'Starts from $0.50/hour',
      icon: CloudApp,
      categories: ['Integration', 'Data']
    },
    {
      id: 22,
      title: 'Key Protect',
      description: 'Encryption key management service.',
      bestFor: 'Best for key management',
      price: 'Starts from $1.00/key',
      icon: Security,
      categories: ['Security']
    },
    {
      id: 23,
      title: 'Secrets Manager',
      description: 'Centralized secrets management.',
      bestFor: 'Best for secrets storage',
      price: 'Starts from $0.50/secret',
      icon: Security,
      categories: ['Security']
    },
    {
      id: 24,
      title: 'Security and Compliance Center',
      description: 'Manage security and compliance posture.',
      bestFor: 'Best for compliance',
      price: 'Custom pricing',
      icon: Security,
      categories: ['Security']
    },
    {
      id: 25,
      title: 'Backup for VPC',
      description: 'Automated backup for VPC resources.',
      bestFor: 'Best for data protection',
      price: 'Starts from $0.05/GB',
      icon: DataBackup,
      categories: ['Storage', 'Networking']
    },
    {
      id: 26,
      title: 'Cloud Backup',
      description: 'Enterprise backup solution.',
      bestFor: 'Best for enterprise backup',
      price: 'Starts from $0.10/GB',
      icon: DataBackup,
      categories: ['Storage', 'Migration']
    },
    {
      id: 27,
      title: 'Schematics',
      description: 'Infrastructure as code with Terraform.',
      bestFor: 'Best for IaC automation',
      price: 'Free',
      icon: Code,
      categories: ['Developer tools']
    },
    {
      id: 28,
      title: 'Continuous Delivery',
      description: 'DevOps toolchain service.',
      bestFor: 'Best for CI/CD pipelines',
      price: 'Free tier available',
      icon: Deploy,
      categories: ['Developer tools']
    },
    {
      id: 29,
      title: 'Power Virtual Server',
      description: 'IBM Power Systems virtual machines.',
      bestFor: 'Best for AIX and IBM i',
      price: 'Starts from $0.50/hour',
      icon: VirtualMachine,
      categories: ['Compute', 'Industry solutions']
    },
    {
      id: 30,
      title: 'VMware Solutions',
      description: 'Run VMware workloads on IBM Cloud.',
      bestFor: 'Best for VMware migration',
      price: 'Custom pricing',
      icon: VirtualMachine,
      categories: ['Compute', 'Migration']
    },
    {
      id: 31,
      title: 'Satellite',
      description: 'Deploy services anywhere.',
      bestFor: 'Best for hybrid cloud',
      price: 'Custom pricing',
      icon: CloudApp,
      categories: ['Networking', 'Industry solutions']
    },
    {
      id: 32,
      title: 'Watson Assistant',
      description: 'Build conversational AI.',
      bestFor: 'Best for chatbots',
      price: 'Starts from $0.0025/message',
      icon: Watson,
      categories: ['AI / ML']
    }
  ];


  const sortOptions = [
    { id: 'lowest-price', text: 'Lowest price first' },
    { id: 'highest-price', text: 'Highest price first' },
    { id: 'name-asc', text: 'Name (A-Z)' },
    { id: 'name-desc', text: 'Name (Z-A)' },
  ];

  const handleFilterChange = (filterName: string, checked: boolean) => {
    if (checked) {
      setSelectedFilters([...selectedFilters, filterName]);
    } else {
      setSelectedFilters(selectedFilters.filter(f => f !== filterName));
    }
  };

  const handleTileClick = (product: Product, index: number) => {
    setSelectedProduct(product);
    setSelectedProductIndex(index);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleNextProduct = () => {
    const nextIndex = (selectedProductIndex + 1) % products.length;
    setSelectedProductIndex(nextIndex);
    setSelectedProduct(products[nextIndex]);
  };

  const handlePreviousProduct = () => {
    const prevIndex = selectedProductIndex === 0 ? products.length - 1 : selectedProductIndex - 1;
    setSelectedProductIndex(prevIndex);
    setSelectedProduct(products[prevIndex]);
  };

  return (
    <>
      <Column lg={16} md={8} sm={4}>
        <Theme theme="g10">
          <h2 className="all-products-heading">All products</h2>
        </Theme>
      </Column>
      
      {/* Filters - 2 columns */}
      <Column lg={3} md={2} sm={4} className="filters-column">
        <Theme theme="g10">
          <aside className="filters-sidebar">
            {filterGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="filter-group">
                {group.items.map((item) => (
                  <div key={item.name} className="filter-item">
                    <Checkbox
                      id={`filter-${item.name}`}
                      labelText={`${item.name} (${item.count})`}
                      checked={selectedFilters.includes(item.name)}
                      onChange={(e) => handleFilterChange(item.name, e.target.checked)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </aside>
        </Theme>
      </Column>
      
      {/* Products - remaining columns */}
      <Column lg={13} md={6} sm={4}>
        <Theme theme="g10">
          <div className="products-main">
            <div className="products-header">
              <p className="search-results-text">
                {selectedFilters.length === 0
                  ? `Showing all ${products.length} products`
                  : `Showing results for "${selectedFilters.join('", "')}" (${products.filter(product =>
                      product.categories.some(category => selectedFilters.includes(category))
                    ).length})`
                }
              </p>
              <Dropdown
                id="sort-dropdown"
                titleText=""
                label="Organise by"
                items={sortOptions}
                itemToString={(item) => item?.text || ''}
                selectedItem={sortOptions.find(opt => opt.id === sortOption)}
                onChange={({ selectedItem }) => setSortOption(selectedItem?.id || 'lowest-price')}
                size="md"
              />
            </div>

            <div className="products-grid">
              {products
                .filter(product => {
                  // If no filters selected, show all products
                  if (selectedFilters.length === 0) return true;
                  // Show product if it matches any selected filter
                  return product.categories.some(category =>
                    selectedFilters.includes(category)
                  );
                })
                .map((product, index) => {
                const IconComponent = product.icon;
                return (
                  <Tile
                    key={product.id}
                    className="product-tile"
                  >
                    <div
                      className="product-tile-body"
                      onClick={() => handleTileClick(product, index)}
                    >
                      <div className="product-tile-icon">
                        <IconComponent size={20} />
                      </div>
                      <h3 className="product-tile-title">{product.title}</h3>
                      <p className="product-tile-description">{product.description}</p>
                    </div>
                    <div className="product-tile-footer">
                      {index < 2 && (
                        <Tag
                          type="purple"
                          size="md"
                          className="product-tag"
                        >
                          Recommended
                        </Tag>
                      )}
                      <div className="product-tile-footer-buttons">
                        <Button
                          kind="ghost"
                          size="sm"
                          renderIcon={Information}
                          iconDescription="Information"
                          hasIconOnly
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTileClick(product, index);
                          }}
                        />
                        <Button
                          kind="primary"
                          size="sm"
                          renderIcon={Add}
                          iconDescription="Add"
                          hasIconOnly
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/create?product=${encodeURIComponent(product.title)}`);
                          }}
                        />
                      </div>
                    </div>
                  </Tile>
                );
              })}
            </div>

          </div>
        </Theme>
      </Column>

      {selectedProduct && (
        <ProductDetailsModal
          open={modalOpen}
          onClose={handleCloseModal}
          productName={selectedProduct.title}
          productIcon={selectedProduct.icon}
          onNextProduct={handleNextProduct}
          onPreviousProduct={handlePreviousProduct}
          showPreviousButton={true}
        />
      )}
    </>
  );
};

export default AllProductsView;

// Made with Bob