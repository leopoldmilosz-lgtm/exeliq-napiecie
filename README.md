# EXELIQ — landing page diagnostyki wysokiego napięcia PV

Statyczna strona pod GitHub Pages.

## Wdrożenie
1. Utwórz repozytorium na GitHubie.
2. Wrzuć zawartość folderu `exeliq-pv-voltage-landing` do repozytorium.
3. Włącz GitHub Pages: `Settings` → `Pages` → `Deploy from branch` → `main` → `/root`.
4. Po publikacji podmień endpoint formularza w `index.html`:

```html
action="https://formspree.io/f/TWOJ_ID_FORMULARZA"
```

## Dane kontaktowe użyte na stronie
- Telefon: 790 581 583
- E-mail: ml@exeliq.pl
- Spółka: Exeliq Prime Sp. z o.o.
- Adres: ul. Stawna 2, 62-052 Komorniki
- NIP: 7773396340
- KRS: 0000997609
- REGON: 52343737300000

## Pliki
- `index.html` — struktura strony
- `styles.css` — styl i układ
- `script.js` — ruchome punkty, animacje, kalkulator strat
- `assets/exeliq_.png` — właściwe logo EXELIQ Group


## Konwersja Google Ads - formularz

Dodano stronę podziękowania:

```text
https://napiecie.exeliq.pl/dziekujemy.html
```

W Google Ads ustaw konwersję formularza jako wejście na URL:

```text
URL zawiera: /dziekujemy.html
```

Formularz w `index.html` ma atrybut:

```html
data-redirect="dziekujemy.html"
```

Po poprawnym wysłaniu formularza do Formspree `script.js` przekieruje użytkownika na stronę podziękowania.

Pamiętaj podmienić endpoint Formspree w `index.html`:

```html
action="https://formspree.io/f/TWOJ_ID_FORMULARZA"
```
