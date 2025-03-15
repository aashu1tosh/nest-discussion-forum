export const getPaginationData = (
    total: number,
    page: number | undefined = 1,
    limit: number | undefined = 10
): {
    total: number
    totalPages: number
    currentPage: number
    perPage: number
} => {
    const currentPage: number = page
    const totalPages: number = Math.ceil(total / limit)

    return { total, totalPages, currentPage, perPage: limit }
}
