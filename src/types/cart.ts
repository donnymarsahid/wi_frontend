export interface CartProps {
  additions: string[];
  colors: string[];
  sizes: string;
  description: string;
  link_design: string;
  long: string;
  formulaType?: string;
  materialType?: string;
  negotiationCode?: string;
  originalPrice?: number;
  productName?: string;
  isNegotiation?: boolean;
  image_product: string;
  paper_type: string;
  print_side: string;
  design_available: string;
  quantity_paper: string;
  quantity: number;
  result_calculator: string;
  width: string;
  name: string;
  id_product: string;
  price: number;
  minimumQuantity?: number;
  discount?: Discount;
  color_type: string;
  special_color: string;
  flipchart_name?: string;
  type_machine?: string;
  detailsUseMachine?: any;

  afp_itemData_primary?: any;
  afp_itemData_secondary?: any;
  afp_itemData_third?: any;
  afp_itemData_fourth?: any;
  afp_itemData_fifth?: any;
}

export interface Discount {
  id: number;
  type: string;
  value: number;
}
