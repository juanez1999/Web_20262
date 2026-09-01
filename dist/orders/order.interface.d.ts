export interface Order {
    id: number;
    customer: string;
    item: string;
    status: 'pending' | 'ready';
}
