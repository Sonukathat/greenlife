const API_BASE_URL = 'https://greenlife-taupe.vercel.app/api';

// Backend API client
class BackendAPI {
  // Helper method for fetch requests
  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth
  async login(email, password) {
    try {
      const data = await this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      return { user: data.user, token: data.token };
    } catch (error) {
      return null;
    }
  }

  async register(name, email, password) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    return data.user;
  }

  // Products
  async getProducts() {
    const data = await this.request('/products');
    return data.products;
  }

  async getProduct(id) {
    const data = await this.request(`/products/${id}`);
    return data.product;
  }

  async addProduct(product) {
    const data = await this.request('/products', {
      method: 'POST',
      body: JSON.stringify(product)
    });
    return data.product;
  }

  async deleteProduct(id) {
    await this.request(`/products/${id}`, {
      method: 'DELETE'
    });
  }

  // Orders
  async createOrder(userId, items, total) {
    const data = await this.request('/orders', {
      method: 'POST',
      body: JSON.stringify({ userId, items, total })
    });
    return data.order;
  }

  async getOrders(userId) {
    const data = await this.request(`/orders/user/${userId}`);
    return data.orders;
  }

  async getAllOrders() {
    const data = await this.request('/orders');
    return data.orders;
  }
}

export const api = new BackendAPI();
