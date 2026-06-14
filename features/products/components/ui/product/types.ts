

export interface ProductCardProps {
    image: string
    description: string
    name: string
    price: string
    onPress?: () => void
    horizontal:boolean
}

export interface ProductCardSelectProps extends Omit<ProductCardProps,"horizontal"> {
    isSelected: boolean
    id:string

}

export interface ProductCardActionProps extends  Omit<ProductCardProps,"horizontal"> {
    incrementQuantity: () => void
    decrementQuantity: () => void
    quantity:number
    subTotal:number
}
