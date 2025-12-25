export function formatDate(dateInput) {
  if (!dateInput) return 'N/A'
  
  let date
  if (typeof dateInput === 'string') {
    date = new Date(dateInput)
  } else if (dateInput?.seconds) {
    // Firestore Timestamp
    date = new Date(dateInput.seconds * 1000)
  } else if (dateInput instanceof Date) {
    date = dateInput
  } else {
    return 'Invalid date'
  }

  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function isPageExpired(expiryDate) {
  if (!expiryDate) return false
  
  let date
  if (typeof expiryDate === 'string') {
    date = new Date(expiryDate)
  } else if (expiryDate?.seconds) {
    date = new Date(expiryDate.seconds * 1000)
  } else if (expiryDate instanceof Date) {
    date = expiryDate
  } else {
    return false
  }

  return date < new Date()
}
