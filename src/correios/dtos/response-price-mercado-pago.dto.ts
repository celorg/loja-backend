export interface ReponsePriceMercadoPago {
    id: number
    name: string
    price?: string
    custom_price?: string
    discount?: string
    currency?: string
    delivery_time?: number
    delivery_range?: DeliveryRange
    custom_delivery_time?: number
    custom_delivery_range?: CustomDeliveryRange
    packages?: Package[]
    additional_services?: AdditionalServices
    company: Company
    error: string;
  }
  
  export interface DeliveryRange {
    min: number
    max: number
  }
  
  export interface CustomDeliveryRange {
    min: number
    max: number
  }
  
  export interface Package {
    price: string
    discount: string
    format: string
    dimensions: Dimensions
    weight: string
    insurance_value: string
    products: Product[]
  }
  
  export interface Dimensions {
    height: number
    width: number
    length: number
  }
  
  export interface Product {
    id: string
    quantity: number
  }
  
  export interface AdditionalServices {
    receipt: boolean
    own_hand: boolean
    collect: boolean
  }
  
  export interface Company {
    id: number
    name: string
    picture: string
  }
  