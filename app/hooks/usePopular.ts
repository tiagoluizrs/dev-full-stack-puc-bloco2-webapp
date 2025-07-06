import { useEffect, useState } from 'react';
import { ApiService } from '~/services/api';

export const usePopular = (type: 'movie' | 'tv') => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const result = await ApiService.getPopulars(type);
            setData(result.results);
            setLoading(false);
        };
        fetch();
    }, [type]);

    return { data, loading };
};
