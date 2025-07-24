import { useState } from 'react'

export const usePagination = <T>(data: T[], pageSize: number = 5) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedData = data.slice(startIndex, startIndex + pageSize)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const nextPage = () => goToPage(currentPage + 1)
  const prevPage = () => goToPage(currentPage - 1)

  // 👇 Smart range generation
  const getPaginationRange = () => {
    const delta = 1 // how many pages to show around current
    const range: (number | string)[] = []
    const rangeWithDots: (number | string)[] = []
    let left = Math.max(2, currentPage - delta)
    let right = Math.min(totalPages - 1, currentPage + delta)

    // Always include first and last page
    range.push(1)
    for (let i = left; i <= right; i++) {
      range.push(i)
    }
    if (right < totalPages - 1) {
      range.push("...")
    }
    if (totalPages > 1) {
      range.push(totalPages)
    }

    // Remove duplicates and sort
    return [...new Set(range)]
  }

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
    paginationRange: getPaginationRange(),
  }
}
