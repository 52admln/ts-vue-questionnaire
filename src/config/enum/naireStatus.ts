export enum NaireStatus {
  UNPUBLISHED = '0',
  PUBLISHED = '1'
}

export const NaireStatusText = {
  [NaireStatus.UNPUBLISHED]: '未发布',
  [NaireStatus.PUBLISHED]: '已发布'
}

export const NaireStatusColor = {
  [NaireStatus.UNPUBLISHED]: 'danger',
  [NaireStatus.PUBLISHED]: 'success'
}
