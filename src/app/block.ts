export interface Block{
    block_id: string;
    sender: string;
    receiver: string;
    sending: string;
    raw_data: string;
    previous_hash: string;
    hash: string;
    golden_nonce: string;
}