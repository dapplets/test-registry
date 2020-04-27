export type AccountConfig = {
    secret: string;
    
    modules: {
        [name: string]: {
            [branch: string]: {
                [version: string]: string;
            }
        }
    };
    
    hostnames: {
        [hostname: string]: {
            [name: string]: string[]
        }
    };

    hashUris: {
        [hash: string]: string[]
    }
}

export type Manifest = {
    name?: string;
    branch?: string;
    version?: string;
    type?: string;
    dist?: string;
    title?: string;
    description?: string;
    icon?: string;
    author?: string;
}