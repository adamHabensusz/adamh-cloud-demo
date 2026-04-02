import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tile, Link, Button, Tag } from '@carbon/react';
import { Code, Add, Information } from '@carbon/icons-react';
import ProductDetailsModal from './ProductDetailsModal';
import './ProductCard.scss';

interface Product {
  name: string;
  description: string;
  icon?: React.ComponentType<any>;
  link?: string;
}

interface ProductCardProps {
  title: string;
  description: string;
  products: Product[];
  moreLink?: string;
  moreText?: string;
  searchQuery?: string;
  onResultCount?: (count: number) => void;
}

// Generate dummy products
const generateDummyProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, i) => ({
    name: `Product ${i + 1}`,
    description: 'Additional product description for expanded view',
    icon: Code,
    link: '#'
  }));
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  products,
  moreLink = '#',
  moreText = 'View 10 more',
  searchQuery = '',
  onResultCount
}) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [additionalProducts] = useState(() => generateDummyProducts(10));
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  
  const allProducts = isExpanded
    ? [...products, ...additionalProducts]
    : products;

  const handleNextProduct = () => {
    if (!selectedProduct) return;
    
    const currentIndex = allProducts.findIndex(p => p.name === selectedProduct.name);
    const nextIndex = (currentIndex + 1) % allProducts.length;
    setSelectedProduct(allProducts[nextIndex]);
    setHasNavigated(true);
  };

  const handlePreviousProduct = () => {
    if (!selectedProduct) return;
    
    const currentIndex = allProducts.findIndex(p => p.name === selectedProduct.name);
    const previousIndex = currentIndex === 0 ? allProducts.length - 1 : currentIndex - 1;
    setSelectedProduct(allProducts[previousIndex]);
  };

  // Enhanced search with keyword matching for use cases
  const matchesSearch = (product: Product, query: string): boolean => {
    const lowerQuery = query.toLowerCase();
    const lowerName = product.name.toLowerCase();
    const lowerDesc = product.description.toLowerCase();
    
    // Direct text match
    if (lowerName.includes(lowerQuery) || lowerDesc.includes(lowerQuery)) {
      return true;
    }
    
    // Keyword-based matching for use cases
    const keywords = {
      vmware: ['vmware', 'vm', 'virtual machine', 'virtualization', 'migrate', 'migration'],
      database: ['database', 'db', 'sql', 'nosql', 'data storage'],
      container: ['container', 'kubernetes', 'k8s', 'docker', 'openshift'],
      ai: ['ai', 'machine learning', 'ml', 'watson', 'artificial intelligence'],
      backup: ['backup', 'recovery', 'disaster recovery', 'restore'],
      network: ['network', 'connectivity', 'vpn', 'private', 'direct link'],
      security: ['security', 'encryption', 'protect', 'secure'],
      storage: ['storage', 'object storage', 'block storage', 'file storage']
    };
    
    // Check if query contains use-case keywords
    for (const [, terms] of Object.entries(keywords)) {
      const queryMatchesCategory = terms.some(term => lowerQuery.includes(term));
      if (queryMatchesCategory) {
        // Check if product is relevant to this category
        const productRelevant = terms.some(term =>
          lowerName.includes(term) || lowerDesc.includes(term)
        );
        if (productRelevant) {
          return true;
        }
      }
    }
    
    return false;
  };

  // Filter products based on search query
  const filteredProducts = searchQuery.trim()
    ? allProducts.filter(product => matchesSearch(product, searchQuery))
    : allProducts;

  // Report result count to parent
  React.useEffect(() => {
    if (onResultCount && searchQuery.trim()) {
      onResultCount(filteredProducts.length);
    }
  }, [filteredProducts.length, searchQuery, onResultCount]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const handleProductClick = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setHasNavigated(false);
  };

  // Don't render card if no products match search
  if (searchQuery.trim() && filteredProducts.length === 0) {
    return null;
  }

  return (
    <Tile className="product-card">
      <div className="product-card-header">
        <h3 className="product-card-title">{title}</h3>
        <p className="product-card-description">{description}</p>
      </div>
      
      <div className="product-list">
        {filteredProducts.map((product, index) => {
          const IconComponent = product.icon;
          return (
            <Tile
              key={index}
              className="product-item"
            >
              <div
                className="product-info"
                onClick={(e) => handleProductClick(e, product)}
              >
                <div className="product-icon">
                  {IconComponent ? <IconComponent size={20} /> : null}
                </div>
                <h4 className="product-name">{product.name}</h4>
                <p className="product-description">{product.description}</p>
              </div>
              <div className="product-footer">
                {index < 2 && (
                  <Tag
                    type="purple"
                    size="md"
                    className="product-tag"
                  >
                    Recommended
                  </Tag>
                )}
                <div className="product-footer-buttons">
                  <Button
                    kind="ghost"
                    size="sm"
                    renderIcon={Information}
                    iconDescription="Information"
                    hasIconOnly
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(e, product);
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
                      navigate(`/create?product=${encodeURIComponent(product.name)}`);
                    }}
                  />
                </div>
              </div>
            </Tile>
          );
        })}
      </div>
      
      <Link href={moreLink} className="product-card-link" onClick={handleToggle}>
        {isExpanded ? 'View less' : moreText}
      </Link>

      {selectedProduct && (
        <ProductDetailsModal
          open={isModalOpen}
          onClose={handleCloseModal}
          productName={selectedProduct.name}
          productIcon={selectedProduct.icon}
          onNextProduct={handleNextProduct}
          onPreviousProduct={handlePreviousProduct}
          showPreviousButton={hasNavigated}
        />
      )}
    </Tile>
  );
};

export default ProductCard;

// Made with Bob
