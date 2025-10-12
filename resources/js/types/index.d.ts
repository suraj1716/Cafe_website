export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
      avatar?: string; // Add avatar property (optional)
}



export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  appName: string;
  csrf_token: string;
  error: string;
  success: {
    message: string;
    time: number;
  };
  auth: {
    user: User;
  };
  ziggy: Config & { location: string };
  totalQuantity: number;
  totalPrice: number;
  miniCartItems: CartItem[];
  categories: Category[];
  dpts: Department[];
faqs: Faq[];
  flash: {
    success?: string;
  };
};

export type PaginationProps<T> = {
  data: T[];

  // object with first / last / prev / next (rarely used for page buttons)
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };

  // meta holds the array you normally loop over
  meta: {
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    per_page: number;
    path: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
  };
};
