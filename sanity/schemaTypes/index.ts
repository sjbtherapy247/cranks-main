import { homePage } from './homePage'
import { service } from './service'
import { post } from './post'
import { category } from './category'
import { storeInfo } from './storeInfo'
import { siteSettings } from './siteSettings'
import { blockContent } from './blockContent'

export const schemaTypes = [
  // Document types
  homePage,
  service,
  post,
  category,
  storeInfo,
  siteSettings,
  
  // Object types
  blockContent,
]