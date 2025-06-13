import { FilterOptions, SortOrder } from './base.type';

export class QueryHelper {
    /**
     * Build a filter object for API queries
     * @param field - The field to filter on
     * @param operator - The filter operator
     * @param value - The value to filter by
     */
    static buildFilter(
        field: string,
        operator: 'eq' | 'like' | 'in' | 'gte' | 'lte' | 'ne' | 'isNull' | 'isNotNull',
        value?: any
    ): FilterOptions {
        return {
            field,
            operator,
            value
        };
    }

    /**
     * Build query parameters for API requests
     * @param options - Query options
     */
    static buildQueryParams(options: {
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: SortOrder;
        search?: string;
        filters?: FilterOptions[];
    }): URLSearchParams {
        const params = new URLSearchParams();

        if (options.page) params.append('page', options.page.toString());
        if (options.limit) params.append('limit', options.limit.toString());
        if (options.sortBy) params.append('sortBy', options.sortBy);
        if (options.sortOrder) params.append('sortOrder', options.sortOrder);
        if (options.search) params.append('search', options.search);
        if (options.filters && options.filters.length > 0) {
            params.append('filters', JSON.stringify(options.filters));
        }

        return params;
    }

    /**
     * Create a filter for exact match
     */
    static equals(field: string, value: any): FilterOptions {
        return this.buildFilter(field, 'eq', value);
    }

    /**
     * Create a filter for partial text match
     */
    static contains(field: string, value: string): FilterOptions {
        return this.buildFilter(field, 'like', value);
    }

    /**
     * Create a filter for values in a list
     */
    static in(field: string, values: any[]): FilterOptions {
        return this.buildFilter(field, 'in', values);
    }

    /**
     * Create a filter for greater than or equal
     */
    static greaterThanOrEqual(field: string, value: any): FilterOptions {
        return this.buildFilter(field, 'gte', value);
    }

    /**
     * Create a filter for less than or equal
     */
    static lessThanOrEqual(field: string, value: any): FilterOptions {
        return this.buildFilter(field, 'lte', value);
    }

    /**
     * Create a filter for not equal
     */
    static notEquals(field: string, value: any): FilterOptions {
        return this.buildFilter(field, 'ne', value);
    }

    /**
     * Create a filter for null values
     */
    static isNull(field: string): FilterOptions {
        return this.buildFilter(field, 'isNull');
    }

    /**
     * Create a filter for non-null values
     */
    static isNotNull(field: string): FilterOptions {
        return this.buildFilter(field, 'isNotNull');
    }
} 