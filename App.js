const { useState, useEffect, useRef } = React;

const ProductComponent = ({ product, onSubmit }) => {
  const [ productType, setProductType ] = useState('premade'); // premade | custom

  const products = [
    { id: 1, src: '01.jpg' },
    { id: 2, src: '02.jpg' },
    { id: 3, src: '03.jpg' },
    { id: 4, src: '04.jpg' },
    { id: 5, src: '05.jpg' },
    { id: 6, src: '06.jpg' },
    { id: 7, src: '07.jpg' },
    { id: 8, src: '08.jpg' },
    { id: 9, src: '09.jpg' },
    { id: 10, src: '10.jpg' },
    { id: 11, src: '11.jpg' },
    { id: 12, src: '12.jpg' },
  ];

  const [ activeImageId, setActiveImageId ] = useState(products[0].id);

  const handleProductTypeChange = (e, type) => {
    setProductType(type);
  }

  const handleProductQtyChange = (e) => {
    console.log('handleProductQtyChange', e);
  }

  const handleProductImageClick = (imgId) => {
    setActiveImageId(imgId);
  }

  const handleProductSubmit = () => {
    onSubmit();
  }

  const settings = {
    dots: false,
    arrows: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: false,
    draggable: false,
    responsive: [{
      breakpoint: 1039,
      settings: {
        slidesToShow: 5,
      }
    }]
  };

  const carouselRef = useRef(null);

  useEffect(() => {
    $(carouselRef.current).slick(settings);

    return () => {
      $(carouselRef.current).slick('unslick');
    };
  }, []);

  const activeImageSrc = (() => {
    const image = products.find(({ id }) => id === activeImageId)
    return image.src
  })();

  return (
    <div className="productCard">
      <div className="productCard-header">
        <h2 className="h2 productCard-headerTitle">Presentation Folder</h2>
      </div>
      <div className="productCard-imageWrapper">
        <div className="productCard-imageBox">
          <img
            src={`assets/images/slider/${activeImageSrc}`}
            alt=""
            className="productCard-image"
          />
        </div>
      </div>

      <div className="carousel productCard-carousel" ref={carouselRef}>
        {products.map(({id, src}) => (
          <div key={id} className="productCard-carouselItem">
            <div
              className={`productCard-carouselImageBox ${activeImageSrc === src ? 'isActive' : ''}`}
              onClick={() => handleProductImageClick(id)}
            >
              <img
                src={`assets/images/slider/${src}`}
                alt=""
                className="productCard-carouselImage"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="productCard-options">
        <div className="productCard-optionsList">
          <label
            className="productCard-option"
            onClick={(e) => {
              handleProductTypeChange(e, 'premade')
            }}
          >
            <input
              type="radio"
              className="radio productCard-optionRadio"
              checked={productType === 'premade'}
              onChange={(e) => {
              }}
            />
            <span className="h3mk1 productCard-optionTitle">Premade Product</span>
            <span className="productCard-priceMark">$</span>

            <span className="productCard-optDescription">
                <span className="productCard-optDescriptionUl">
                    <span className="productCard-optDescriptionLi">Gold foil stamped logo</span>
                    <span className="productCard-optDescriptionLi">100lb Black linen stock</span>
                    <span className="productCard-optDescriptionLi">Business card slit on right pocket</span>
                </span>

                <span className="productCard-optDescriptionNote">Production Time: 2 working days</span>
            </span>
          </label>

          <label
            className="productCard-option"
            onClick={(e) => {
              handleProductTypeChange(e, 'custom')
            }}
          >
            <input
              type="radio"
              className="radio productCard-optionRadio"
              checked={productType === 'custom'}
              onChange={(e) => {
              }}
            />
            <span className="h3mk1 productCard-optionTitle">Custom Product</span>
            <span className="productCard-priceMark">$$</span>

            <span className="productCard-optDescription">
            <span className="productCard-optDescriptionPara">Create your own design and customize it with imprints, stocks, coatings, slits (including for business cards), and more.</span>
            <span className="productCard-optDescriptionNote">Production Time: 5-9 working days</span>
          </span>

            <span className="productCard-servicesList">
              <span className="productCard-servicesListItem">Free Artwork Review</span>
              <span className="productCard-servicesListItem">Free Corrections</span>
              <span className="productCard-servicesListItem">Free Proof</span>
            </span>
          </label>
        </div>

        {productType === 'premade' && (
          <div className="productCard-qty">
            <label className="h3mk1 productCard-qtyLabel" htmlFor="qtySelect">Select Quantity</label>
            <select
              id="qtySelect"
              className="select productCard-qtySelect"
              onChange={handleProductQtyChange}
            >
              <option>00,000</option>
              <option>00,000</option>
              <option>00,000</option>
            </select>
            <button
              type="button"
              className="button productCard-qtyGetButton"
              onClick={handleProductSubmit}
            >Get Pricing
            </button>

            <span className="productCard-qtyShipping">
              <span className="productCard-qtyShippingTitle">Free Shipping</span> - Expires 1/31
            </span>
          </div>
        )}
        {productType === 'custom' && (
          <div className="productCard-qty">
            <label className="h3mk1 productCard-qtyLabel" htmlFor="qtySelect">Quantity</label>
            <input
              id="qtySelect"
              type="text"
              value="00,000"
              className="input productCard-qtySelect"
              onChange={handleProductQtyChange}
            />
            <button
              type="button"
              className="button productCard-qtyGetButton"
              onClick={handleProductSubmit}
            >Start Customizing
            </button>

            <span className="productCard-qtyMinimum">25 Minimum</span>

            <span className="productCard-qtyShipping">
              <span className="productCard-qtyShippingTitle">Free Shipping</span> - Expires 1/31
            </span>
          </div>
        )}
      </div>

      <div className="productCard-warranty">
        <div className="productCard-warrantyText">
          <h4 className="h4 productCard-warrantyTitle">Lifetime Warranty</h4>
          <p className="productCard-warrantyPara">We guarantee this product to last a lifetime.</p>
          <a href="#" className="link1 productCard-warrantyReadMore">Learn more</a>
        </div>

        <ul className="productCard-warrantyMenu">
          <li className="productCard-warrantyMenuItem">
            <a href="#" className="link2 productCard-warrantyMenuLink productCard-warrantyMenuLink_quality">Quality
              Inspections</a>
          </li>
          <li className="productCard-warrantyMenuItem">
            <a href="#" className="link2 productCard-warrantyMenuLink productCard-warrantyMenuLink_protection">Shipping
              Protection</a>
          </li>
        </ul>
      </div>

      <div className="productCard-description">
        <p className="productCard-descriptionPara">This folder exudes luxury with its precisely cut square corners,
          which create a crisp, clean exterior, and its profound textured stocks (contained in the premade product),
          constructed to be sturdy yet flexible with powerful tactical impact. The folder’s two pockets keep your
          letter-size (8 1/2" x 11") documents including marketing materials, checklists, timelines, guides, proposals,
          and listings for your clients secure and organized. We recommend adding a business card slit to the right
          pocket (contained in the premade product) to highlight your contact information, making it easy for your
          clients to reach out.</p>
      </div>

      <div className="productCard-specs">
        <h4 className="productCard-specsTitle">Dimension Open:</h4>
        <p className="productCard-specsPara">18" x 12"</p>

        <h4 className="productCard-specsTitle">Dimension Closed:</h4>
        <p className="productCard-specsPara">9" x 12"</p>

        <h4 className="productCard-specsTitle">Orientation:</h4>
        <p className="productCard-specsPara">Portrait</p>

        <h4 className="productCard-specsTitle">Holds:</h4>
        <p className="productCard-specsPara">Letter size paper (8 1/2" x 11")</p>

        <h4 className="productCard-specsTitle">Left Pocket:</h4>
        <p className="productCard-specsPara">4 1/4" tall v-split horizontal pocket</p>

        <h4 className="productCard-specsTitle">Right Pocket:</h4>
        <p className="productCard-specsPara">4 1/4" tall v-split horizontal pocket</p>
      </div>
    </div>
  )
};

const CustomizationModal = ({onClose}) => {
  const handleCloseButtonClick = () => {
    onClose();
  }

  return (
    <div className="modal">
      <div className="modalHeader">
        <div className="modalHeader-title">
        <h4 className="modalHeader-text">Start Customizing</h4>
          <span className="formNote"><b className="formAsterisk">*</b>Required Fields</span>
        </div>

        <button type="button" className="modalCloseButton" onClick={handleCloseButtonClick}></button>
      </div>

      <div className="modalContent">
        <form className="form customizingFrom">
          <section className="formSection">
            <div className="formSection-header">
              <h2 className="formSection-title">Product Options</h2>

              <div className="customizingFrom-options">
                <button type="button" className="customizingFrom-optionsToggle isActive">Standard Options <i className="customizingFrom-optionsToggleIcon"><i className="customizingFrom-optionsToggleIcon-iconBar"></i></i></button>
                <div className="customizingFrom-optionsContent">
                  <div className="accordion">
                    <div className="accordionItem">
                      <div className="accordionItemTitle">
                        <span className="customizingFrom-popularOptions">Popular Options</span>
                      </div>
                    </div>

                    <div className="accordionItem isActive">
                      <div className="accordionItemTitle">
                        <h3 className="accordionItemTitle-text">Imprints</h3>
                        <i className="accordionItemTitle-icon"></i>
                      </div>

                      <div className="accordionItemContent">
                        <section className="accordionItemContent-section">
                          <h4 className="accordionItemContent-title">IMPRINT METHODS</h4>
                          <p className="accordionItemContent-para">Blank Product, Four Color Process (CMYK), PMS Printing, Embossing, Debossing, <a href="#" className="accordionItemContent-link">Foil Stamping</a></p>
                        </section>
                        <section className="accordionItemContent-section">
                          <h4 className="accordionItemContent-title">Metallic Foil Colors</h4>
                          <p className="accordionItemContent-para">Gold, Silver, Platinum, Pewter, Gun Metal, Brass, Treasure, Copper, Rose Gold, Apple, Blue, Sapphire Blue, Teal, Green, Lime</p>
                        </section>

                        <section className="accordionItemContent-section">
                          <h4 className="accordionItemContent-title">Non-Metallic Foil Colors</h4>
                          <p className="accordionItemContent-para">Clear, White, Red, Burgundy, Blue, Pine, Black</p>
                        </section>
                      </div>
                    </div>

                    <div className="accordionItem">
                      <div className="accordionItemTitle">
                        <h3 className="accordionItemTitle-text">Stocks</h3>
                        <i className="accordionItemTitle-icon"></i>
                      </div>
                    </div>

                    <div className="accordionItem">
                      <div className="accordionItemTitle">
                        <h3 className="accordionItemTitle-text">Coatings</h3>
                        <i className="accordionItemTitle-icon"></i>
                      </div>
                    </div>

                    <div className="accordionItem">
                      <div className="accordionItemTitle">
                        <h3 className="accordionItemTitle-text">Slits</h3>
                        <i className="accordionItemTitle-icon"></i>
                      </div>
                    </div>

                    <div className="accordionItem">
                      <div className="accordionItemTitle">
                        <h3 className="accordionItemTitle-text">Extras</h3>
                        <i className="accordionItemTitle-icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="formRow">
              <textarea className="textarea customizingFrom-yourWish" placeholder="Tell us your wish; anything is doable"></textarea>
            </div>
          </section>

          <section className="formSection">
            <div className="formSection-header">
              <h2 className="formSection-title">Delivery Information</h2>
              <p className="formSection-para">Used to calculate shipping time/cost</p>
            </div>

            <div className="formRowsGrid">
              <div className="formRow">
                <span className="formLabel">Country:</span>
                <div className="formRow-content">
                  <div className="customizingFromCountry">
                    <label className="radioControl">
                      <input className="radio" type="radio" name="country" checked />
                      <span className="radioControl-text">United States</span>
                    </label>
                    <label className="radioControl">
                      <input className="radio" type="radio" name="country" />
                      <span className="radioControl-text">Canada</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="formRow">
                <label className="formLabel"><b className="formAsterisk">*</b>Zip Code:</label>
                <div className="formRow-content">
                  <input type="text" className="input customizingFrom-zip" />
                </div>
              </div>

              <div className="formRow">
                <label className="formLabel">Delivery Date:</label>
                <div className="formRow-content">
                  <div className="customizingFromDDate">
                    <div className="customizingFromDDate-item">
                      <label className="radioControl">
                        <input className="radio" type="radio" name="ddate" checked />
                        <span className="radioControl-text">Standard Time</span>
                      </label>
                    </div>
                    <div className="customizingFromDDate-item customizingFromDDate-item_rushed">
                      <label className="radioControl">
                        <input className="radio" type="radio" name="ddate" />
                        <span className="radioControl-text">Rushed</span>
                      </label>
                      <input type="date" placeholder="MM/DD/YYYY" className="input customizingFrom-rushed" disabled />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="formSection-header">
              <h2 className="formSection-title">Contact Information</h2>
            </div>

            <div className="formRowsGrid">
              <div className="formRow">
                <label className="formLabel"><b className="formAsterisk">*</b>First Name:</label>
                <div className="formRow-content">
                  <input type="text" className="input customizingFrom-input" />
                  {/*
                    <span className="formError">Please enter your first name.</span>
                  */}
                </div>
              </div>
              <div className="formRow">
                <label className="formLabel"><b className="formAsterisk">*</b>Last Name:</label>
                <div className="formRow-content">
                  <input type="text" className="input customizingFrom-input" />
                </div>
              </div>
              <div className="formRow">
                <label className="formLabel"><b className="formAsterisk">*</b>Company:</label>
                <div className="formRow-content">
                  <input type="text" className="input customizingFrom-input" />
                </div>
              </div>
              <div className="formRow">
                <label className="formLabel"><b className="formAsterisk">*</b>Phone Number:</label>
                <div className="formRow-content">
                  <div className="customizingFromPhone">
                    <input type="text" className="input customizingFrom-input customizingFromPhone-number" />

                    <label className="customizingFromPhone-extControl">
                      Ext:
                      <input type="text" className="input customizingFrom-input customizingFromPhone-ext" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="formRow">
                <label className="formLabel"><b className="formAsterisk">*</b>Email:</label>
                <div className="formRow-content">
                  <input type="email" className="input customizingFrom-input" />
                </div>
              </div>

              <div className="formRow">
                <div className="formRow-content">
                  <button className="button formButton customizingFrom-submit" type="submit">Get Pricing</button>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}

const Modal = (props) => {
  const {
    children,
    onClose
  } = props;

  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  const handleModalCloseClick = () => {
    onClose()
  }

  return domReady ? (
    ReactDOM.createPortal(
      <div className="modalWrapper">
        {children}
      </div>, document.getElementById('modal-portal'))
  ) : null
}

const App = () => {
  useEffect(() => {
    console.log('FETCH');
  }, []);

  const [isCustomizationModalVisible, setIsCustomizationModalVisible] = useState();

  const [products, setProducts] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);

  const onProductSubmit = () => {
    setIsCustomizationModalVisible(true);
  }

  const onCustomizationModalClose = () => {
    setIsCustomizationModalVisible(false);
  }

  return (
    <>
      {isCustomizationModalVisible && (
        <Modal>
          <CustomizationModal
            onClose={onCustomizationModalClose}
          />
        </Modal>
      )}
      <div className="container container_content">
        <div className="products">
          <div className="productsHeader">
            <h1 className="h1 productsHeader-title">EXP REALTY LUXURY PRODUCTS</h1>
            <div className="productsHeader-count">1 - 3 of 3 Products</div>
          </div>
          <div className="productsList">
            {products.map((product) => (
              <ProductComponent
                key={product.id}
                product={product}
                onSubmit={onProductSubmit}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
