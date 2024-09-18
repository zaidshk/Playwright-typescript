
import fetch from 'node-fetch'
import { URLSearchParams } from 'url'

const baseUrl = 'https://api.mail7.io'

const keys = {
  apikey: '<your_api_key>',
  apisecret: '<your_secret_key>',
}

const requestOptions = {
  headers: {
    Accept: 'application/json',
  },
}
    
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    
export type Email = {
  from: string
  to: string
  subject: string
  text: string
  html: string
}

// Retrieve the first email from inbox and delete it right away
export const getLatestEmail = async (email: string): Promise<Email> => {
  const queryParams = new URLSearchParams({ ...keys, to: email.split('@')[0], domain: email.split('@')[1],}).toString()
  const url = `${baseUrl}/inbox?${queryParams}`
  let triesLeft = 10
  
  do {
    const response = await fetch(url, requestOptions)
    if (response.ok) {
      const body = await response.json()
      
      /*if (body.data.length > 0) {
        const mesId = body.data[0]._id
        const rawEmail = body.data[0].mail_source
        await deleteEmail(mesId)
        return {
          from: rawEmail.from.value[0].address,
          to: rawEmail.to.value[0].address,
          subject: rawEmail.subject, 
          text: rawEmail.text,
          html: rawEmail.html,
        }
      }*/
      
   
      await delay(1000)
    } else {
      console.error(`[API] could not read emails: ${await response.text()}`)
    }
    triesLeft--
  } while (triesLeft)
  throw console.error(`[API] inbox is empty for ${email}`)
}

export const deleteEmail = async (id: string) => {
  const queryParams = new URLSearchParams({ ...keys, mesid: id }).toString()
  const url = `${baseUrl}/delete?${queryParams}`
  const response = await fetch(url, requestOptions)
  if (!response.ok) {
    console.error(`[API] could not delete email: ${await response.text()}`)
  }
}
