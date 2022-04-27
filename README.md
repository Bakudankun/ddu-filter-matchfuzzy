# ddu-filter-matchfuzzy

A filter for ddu.vim that use Vim's builtin `matchfuzzy()` function


## Required

* [denops.vim](https://github.com/vim-denops/denops.vim)
* [ddu.vim](https://github.com/Shougo/ddu.vim)


## Configuration

```vim
  " Use matchfuzzy filter.
  call ddu#custom#patch_global({
      \   'sourceOptions': {
      \     '_': {
      \       'matchers': ['matcher_matchfuzzy'],
      \     },
      \   }
      \ })

  " Specify options
  call ddu#custom#patch_global({
      \   'filterParams': {
      \     'matcher_matchfuzzy': {
      \       'highlightMatched': 'Search',
      \       'limit': 100,
      \       'matchseq': v:true,
      \     },
      \   }
      \ })
```

See the [help document](doc/ddu-filter-matchfuzzy.txt) for the detail.


## License

MIT
