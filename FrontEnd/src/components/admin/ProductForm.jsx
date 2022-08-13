import React,{useState} from 'react';
import { useForm } from '../../hooks/useForm';

const ProductForm = (props) =>{
    const [isTopProduct, setIsTopProduct] = useState(props.productDetails?.isTopProduct || false);
    const handleSubmit = e => {
        e.preventDefault();
        if (isValid()) {
          let requestBody = {...values};
          requestBody.isTopProduct = isTopProduct;
         props.handleSubmit(requestBody);
        }
      };
    const handleChange = ()=>{
        setIsTopProduct(!isTopProduct);
    }  
    const { values, errors, bindField, isValid } = useForm({
        validations: {
          name: {
            required: {
              value: true,
              message: 'product name is required',
            },
          },
          category: {
            required: {
              value: true,
              message: 'department category is required',
            },
          },
          price: {
            required: {
              value: true,
              message: 'price is required',
            }
          },
          discountPrice: {
            required: {
              value: true,
              message: 'discountPrice is required',
            },
          },
          description: {
            required: {
              value: true,
              message: 'description is required',
            },
          },
          image: {
            required: {
              value: true,
              message: 'image path is required',
            },
          },
        },
        initialValues: {
          name: props.productDetails?.name || '',
          category: props.productDetails?.category || '',
          price:props.productDetails?.price ||'',
          discountPrice:props.productDetails?.discountPrice ||'',
          description:props.productDetails?.description ||'',
          image:props.productDetails?.image ||'',
        },
      });

    return <div className='mt-5 container'>
        {props.productDetails ?
        <h1> Edit product Details</h1>
        :
        <h1> Add new product</h1>
        }
        <form className='mt-5' onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor='name' className='form-label'>Product Name</label>
        <input type='text' className={`form-control ${errors.name ? "is-invalid" : ""}`} {...bindField('name')} name="name" id="product_name" aria-describedby="product name" />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      <div className='mb-3'>
        <label htmlFor='category' className='form-label'>Department</label>
        <input type='text' className={`form-control ${errors.category ? "is-invalid" : ""}`} {...bindField('category')} name="category" id="Department" aria-describedby="department category" />
        {errors.category && <div className="invalid-feedback">{errors.category}</div>}
      </div>
      <div className='mb-3'>
        <label htmlFor='price' className='form-label'>Price</label>
        <input type='text' className={`form-control ${errors.price ? "is-invalid" : ""}`} {...bindField('price')} name="price" id="price" aria-describedby="price" />
        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
      </div>
      <div className='mb-3'>
        <label htmlFor='discountPrice' className='form-label'>Discount Price</label>
        <input type='text' className={`form-control ${errors.discountPrice ? "is-invalid" : ""}`} {...bindField('discountPrice')} name="discountPrice" id="discountPrice" aria-describedby="discount Price" />
        {errors.discountPrice && <div className="invalid-feedback">{errors.discountPrice}</div>}
      </div>
      <div className='mb-3'>
        <label htmlFor='image' className='form-label'>Product Image</label>
        <input type='text' className={`form-control ${errors.image ? "is-invalid" : ""}`} {...bindField('image')} name="image" id="image" aria-describedby="product Image" />
        {errors.image && <div className="invalid-feedback">{errors.image}</div>}
      </div>
      <div className='mb-3'>
        <label htmlFor='description' className='form-label'>Product Description</label>
        <input type='text' className={`form-control ${errors.description ? "is-invalid" : ""}`} {...bindField('description')} name="description" id="description" aria-describedby="Product Description" />
        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
      </div>
      <div className='mb-3 form-check'>
        <label htmlFor='isTopProduct' className='form-check-label'>Top Selling Product</label>
        <input type='checkbox' className='form-check-input' name="isTopProduct" id="isTopProduct" checked={isTopProduct}
        onChange={handleChange} aria-describedby="Top Selling Product" />
      </div>
      <div className='mt-3 float-end'>
      {props.productDetails ?
        <button type='submit' id='update-product-submit' className='btn btn-primary'>Update Product</button>:
        <button type='submit' id='add-product-submit' className='btn btn-primary'>Add New Product</button>
      }
      </div>
    </form>
    </div>
};

export default ProductForm;