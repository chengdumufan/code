// Named imports should be alphabetized.
import {A, B} from 'foo';
import {B, A} from 'foo'; // failure

// Case is irrelevant for named import ordering.
import {A, b, C} from 'zfoo';
import {bz, A, C} from 'foo'; // failure

// Underscores come last.
import {A, _b, C, d} from 'zfoo'; // failure
import {A, C, d, _b} from 'zfoo';

import {
    b as c,
    a as d,
} from "z";
import {g} from "y"; // failure

// Import sources should be alphabetized.
import * as bar from 'bar';
import * as foo from 'foo';

import * as abc from 'abc';
import * as foo from 'foo';
import * as bar from 'bar'; // failure

// ignore quotes
import * as bar from 'bar';
import * as foo from "foo";

import * as bar from "bar";
import * as foo from 'foo';

// Case is irrelevant for source import ordering.
import {A, B} from 'Bar';
import {A, B} from 'baz';
import {A, B} from 'Foo'; // should not fail

// Other styles of import statements.
import someDefault, {nameA, nameBReallyLong as anotherName} from "./wherever";
import someDefault from "module";
import "something";

// do not fix cases where a newline is missing
import * as foo from 'foo';  import * as bar from 'bar';

import * as foo from 'foo';
import * as bar from 'bar';
