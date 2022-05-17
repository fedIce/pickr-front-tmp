export const _retrieveNextStatus = (status) => {
    switch (status) {
        case 'not_accepted':
            return 'accepted'
        case 'accepted':
            return 'picked_up'
        case 'picked_up':
            return 'delivered'
        default:
            return 'not_accepted'
    }
}