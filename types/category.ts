enum CategoryType {
    'text' = "text", 
    'number' = "number",
    'boolean' = 'boolean', 
    'select' = 'select'
    }

export interface AttributeField {
    key:string,
    type?: CategoryType,
    required?: boolean
}

export interface Categories {
    id?: string,
    name: string,
    slug: string,
    description?: string,
    parentId?: string,
    attributeSchema?: AttributeField[],
    isActive?: boolean,
    sortOrder?: string,
    patent?: Categories | null
}