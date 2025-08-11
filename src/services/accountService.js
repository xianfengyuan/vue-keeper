import { db } from '../utility/firebaseConfig'
import { collection, addDoc, getDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'

const accountCollection = collection(db, 'accounts')

export default {
  async createAccount(accountData) {
    const docRef = await addDoc(accountCollection, accountData)
    return { id: docRef.id, ...accountData }
  },

  async getAccounts() {
    const snaphost = await getDocs(accountCollection)
    return snaphost.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  },

  async getAccountById(id) {
    const docRef = doc(db, 'accounts', id)
    const snaphost = await getDoc(docRef)
    return { id: snaphost.id, ...snaphost.data() }
  },

  async updateAccount(id, accountData) {
    const docRef = doc(db, 'accounts', id)
    await updateDoc(docRef, accountData)
    return { id, ...accountData }
  },

  async deleteAccount(id) {
    const docRef = doc(db, 'accounts', id)
    await deleteDoc(docRef)
  },
}
