// For API calls related to customers
import { fetchCustomers, createCustomer } from './customers';

// React for state management and rendering
import React, { useEffect, useState } from 'react';

// Optional: Form validation library (e.g., Formik or React Hook Form)
import { useForm } from 'react-hook-form'; // Example with React Hook Form



export const fetchProducts = async () => {
    const response = await fetch('/api/products', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    });
    return await response.json();
  };
  
  export const createProduct = async (productData) => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(productData),
    });
    return await response.json();
  };
  