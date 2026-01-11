import { Member } from '@/types'

export const MEMBERS: Member[] = [
  {
    id: 'umuti',
    name: '우무티',
    englishName: 'UMUTI',
    placeholderImage: '/WUMUTI.png',
    accentColor: '#C9A962',
    description: '따뜻한 빛의 존재',
  },
  {
    id: 'rui',
    name: '루이',
    englishName: 'RUI',
    placeholderImage: '/RUI.png',
    accentColor: '#7B9ED9',
    description: '차가운 달빛의 존재',
  },
  {
    id: 'hyun',
    name: '현',
    englishName: 'HYUN',
    placeholderImage: '/HYUN.png',
    accentColor: '#D4A5A5',
    description: '부드러운 새벽의 존재',
  },
  {
    id: 'haru',
    name: '하루',
    englishName: 'HARU',
    placeholderImage: '/HARU.png',
    accentColor: '#A8D5BA',
    description: '생명의 봄날 같은 존재',
  },
]

export const getMemberById = (id: string): Member | undefined =>
  MEMBERS.find((member) => member.id === id)

export const getMemberColor = (id: string): string => {
  const member = getMemberById(id)
  return member?.accentColor || '#FFFFFF'
}
