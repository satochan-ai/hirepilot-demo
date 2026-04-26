# データモデル設計

## ■ 必須カラム

candidate_name  
media  
scout_sent_date  
opened  
applied  
document_pass  
interview_1  
interview_2  
offer  
accepted  
joined  
ng_reason  

---

## ■ データ形式

| カラム | 型 | 備考 |
|------|----|------|
| candidate_name | string | 候補者名 |
| media | string | 媒体名 |
| opened | boolean | ○/× |
| applied | boolean | ○/× |
| document_pass | boolean | ○/× |
| interview_1 | boolean | ○/× |
| interview_2 | boolean | ○/× |
| offer | boolean | ○/× |
| accepted | boolean | ○/× |
| joined | boolean | ○/× |
| ng_reason | string | NG理由 |

---

## ■ NG理由分類

- スキル不足
- 経験不足
- 条件不一致
- 辞退
- 他社決定
- コミュニケーション

---

## ■ 設計ルール

- booleanは必ず○/×で統一
- 日付は可能な限り保持
- NG理由は必ず入力

---

## ■ 将来拡張

- 想定年収
- 希望条件
- 面接評価スコア

---

## ■ 設計思想

- 分析可能な構造を優先
- 入力負荷は最小化