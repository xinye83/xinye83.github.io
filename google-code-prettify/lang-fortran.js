/**
 * @license
 * Copyright (C) 2008 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * Registers a language handler for Fortran
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-fortran">(fortran code)</pre>
 *
 * I used lang-lisp.js as a template and <a
 * href="http://fortranwiki.org/fortran/show/Keywords">The Fortran
 * Wiki</a> for the list of keywords
 *
 * Should work for the majority of Fortran versions
 *
 * @author zed.three@gmail.com
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
            // A line comment that starts with !
            [PR['PR_COMMENT'],     /^![^\r\n]*/, null, '!'],
            // Whitespace - don't match newlines or old-style comments
            // won't work
            [PR['PR_PLAIN'],       /^[\t\r \xA0]+/, null, '\t\r \xA0'],
            // Strings may use embedded double delimiters to represent
            // a single character of that delimiter
            [PR['PR_STRING'],      /^\"(?:([^\\"\r\n]|\"\")*\")/, null, '\"'],
            [PR['PR_STRING'],      /^\'(?:([^\'\r\n]|\'\')*\')/, null, '\'']
        ],
        [
            // Fixed-form style comment - c or * in first column
            [PR['PR_COMMENT'], /^\n+(?:c|\*).*/i],
            // 'type(foo)' is a type
            // 'type foo' is a keyword
            [PR['PR_TYPE'], /^type *(?:\([^ \r\n]+\))/i],
            // Keywords from all versions of Fortran
            [PR['PR_KEYWORD'], /^(?:abstract|allocatable|allocate|all *stop|assign|asynchronous|backspace|bind|call|case|class|close|codimension|common|contains|contiguous|continue|cycle|data|deallocate|deferred|dimension|do *,? *concurrent|elemental|entry|enumerator|equivalence|error stop|exit|extends|external|final|flush|format|generic|go *to|implicit|import|in *out|include|inquire|intent|intrinsic|lock|namelist|nopass|nullify|only|open|operator|optional|overridable|parameter|pass|pause|pointer|print|private|protected|public|pure|read|recursive|result|return|rewind|rewrite|non_save|sequence|stop|target|then|unlock|use|value|volatile|wait|where|while|write)\b/i],
            // Block beginning/end statements (optional spaces)
            [PR['PR_KEYWORD'], /^(?:end *)?(?:associate|block|block *data|critical|do|enum|file|forall|function|if|interface|module|procedure|program|select|submodule|subroutine|type|where)\b/i],
            [PR['PR_KEYWORD'], /^(?:sync *)(?:all|images|memory)/i],
            [PR['PR_KEYWORD'], /^(?:else *)(?:if|where)?/i],
            // Boolean literals
            [PR['PR_LITERAL'], /^\.(?:true|false)\./i],
            // User defined .operators.
            [PR['PR_KEYWORD'], /^\.\w*\./i],
            [PR['PR_TYPE'], /^(?:character|complex|double *precision|integer|real|logical)\b/i],
            [PR['PR_LITERAL'], /^[+\-]?\.?\d+(?:\.\d*)?(?:[EeDd][+\-]?\d+)?/],
            //
            [PR['PR_PUNCTUATION'], /^[+\-/*=^&|<>%[\]()?:.,]/ ],
            // iso_c_binding
            [PR['PR_TYPE'], /^c_(ptr|funptr)/i],
            // List of constants from GNU Fortran manual
            [PR['PR_LITERAL'], /^c_(int|short|long|long_long|signed_char|size_t|int8_t|int16_t|int32_t|int64_t|int128_t|int_least8_t|int_least16_t|int_least32_t|int_least64_t|int_least128_t|int_fast8_t|int_fast16_t|int_fast32_t|int_fast64_t|int_fast128_t|intmax_t|intptr_t|ptrdiff_t|float|double|long_double|float128|float_complex|double_complex|long_double_complex|float128_complex|bool|char|null_char|alert|backspace|form_feed|new_line|carriage_return|horizontal_tab|vertical_tab|null_ptr|null_funptr)/i]
        ]
    ),
    ['f', 'f90', 'F', 'F90', 'fortran']);