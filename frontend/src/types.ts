export interface ProductI {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews?: number;
}

export interface FetchQueryData<T> {
  data: T;
  isLoading: boolean;
  error: {
    data: {
      message: string;
    };
  };
}

export interface Cart extends ProductI {
  qty: number;
}

export interface LoginData {
  email: string;
  password: string;
}
export interface RegisterData extends LoginData {
  name: string;
}
export interface UserInfo extends LoginData {
  _id: string;
  isAdmin: boolean;
  name: string;
}
