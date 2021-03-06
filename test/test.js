/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

'use strict';

// MODULES //

var tape = require( 'tape' );
var isFunction = require( '@stdlib/assert-is-function' );
var hasOwnProp = require( '@stdlib/assert-has-own-property' );
var quantile = require( '@stdlib/stats-base-dists-erlang-quantile' );
var cdf = require( '@stdlib/stats-base-dists-erlang-cdf' );
var logpdf = require( '@stdlib/stats-base-dists-erlang-logpdf' );
var mgf = require( '@stdlib/stats-base-dists-erlang-mgf' );
var pdf = require( '@stdlib/stats-base-dists-erlang-pdf' );
var entropy = require( '@stdlib/stats-base-dists-erlang-entropy' );
var kurtosis = require( '@stdlib/stats-base-dists-erlang-kurtosis' );
var skewness = require( '@stdlib/stats-base-dists-erlang-skewness' );
var stdev = require( '@stdlib/stats-base-dists-erlang-stdev' );
var variance = require( '@stdlib/stats-base-dists-erlang-variance' );
var mode = require( '@stdlib/stats-base-dists-erlang-mode' );
var mean = require( '@stdlib/stats-base-dists-erlang-mean' );
var Erlang = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof Erlang, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if provided an `k` argument which is not a positive integer', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		-5.0,
		0.0,
		1.5,
		NaN,
		true,
		false,
		void 0,
		null,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			// eslint-disable-next-line no-new
			new Erlang( value, 2.0 );
		};
	}
});

tape( 'the function throws an error if provided a `lambda` argument which is not a positive number', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		-5.0,
		0.0,
		NaN,
		true,
		false,
		void 0,
		null,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			// eslint-disable-next-line no-new
			new Erlang( 2.0, value );
		};
	}
});

tape( 'if provided arguments, the function requires both `k` and `lambda`', function test( t ) {
	t.throws( foo, TypeError, 'throws an error' );
	t.end();

	function foo() {
		// eslint-disable-next-line no-new
		new Erlang( 2.0 );
	}
});

tape( 'the function returns a new distribution instance (default parameters)', function test( t ) {
	var erlang = new Erlang();
	t.strictEqual( erlang instanceof Erlang, true, 'returns an instance' );
	t.end();
});

tape( 'the function returns a new distribution instance (custom parameters)', function test( t ) {
	var erlang = new Erlang( 2.0, 4.0 );
	t.strictEqual( erlang instanceof Erlang, true, 'returns an instance' );
	t.end();
});

tape( 'the function can be invoked without the new operator', function test( t ) {
	// eslint-disable-next-line new-cap
	var erlang = Erlang();
	t.strictEqual( erlang instanceof Erlang, true, 'returns an instance' );

	// eslint-disable-next-line new-cap
	erlang = Erlang( 2.0, 4.0 );
	t.strictEqual( erlang instanceof Erlang, true, 'returns an instance' );

	t.end();
});

tape( 'the created distribution has a property for getting and setting `k`', function test( t ) {
	var erlang;

	erlang = new Erlang( 2.0, 4.0 );
	t.strictEqual( hasOwnProp( erlang, 'k' ), true, 'has property' );
	t.strictEqual( erlang.k, 2.0, 'returns expected value' );

	erlang.k = 3.0;
	t.strictEqual( erlang.k, 3.0, 'returns expected value' );

	t.end();
});

tape( 'the created distribution throws an error if one attempts to set `k` to a value which is not a positive integer', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		-5.0,
		0.0,
		1.3,
		NaN,
		true,
		false,
		void 0,
		null,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			var erlang = new Erlang();
			erlang.k = value;
		};
	}
});

tape( 'the created distribution has a property for getting and setting `lambda`', function test( t ) {
	var erlang;

	erlang = new Erlang( 2.0, 4.0 );
	t.strictEqual( hasOwnProp( erlang, 'lambda' ), true, 'has property' );
	t.strictEqual( erlang.lambda, 4.0, 'returns expected value' );

	erlang.lambda = 3.0;
	t.strictEqual( erlang.lambda, 3.0, 'returns expected value' );

	t.end();
});

tape( 'the created distribution throws an error if one attempts to set `lambda` to a value which is not a positive number', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		-5.0,
		0.0,
		NaN,
		true,
		false,
		void 0,
		null,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			var erlang = new Erlang();
			erlang.lambda = value;
		};
	}
});

tape( 'the distribution prototype has a property for retrieving the distribution entropy', function test( t ) {
	var erlang;

	t.strictEqual( hasOwnProp( Erlang.prototype, 'entropy' ), true, 'has property' );

	erlang = new Erlang();
	t.strictEqual( erlang.entropy, entropy( 1.0, 1.0 ), 'returns expected value' );

	t.end();
});

tape( 'the distribution prototype has a property for retrieving the distribution kurtosis', function test( t ) {
	var erlang;

	t.strictEqual( hasOwnProp( Erlang.prototype, 'kurtosis' ), true, 'has property' );

	erlang = new Erlang( 2.0, 4.5 );
	t.strictEqual( erlang.kurtosis, kurtosis( 2.0, 4.5 ), 'returns expected value' );

	t.end();
});

tape( 'the distribution prototype has a property for retrieving the distribution mean', function test( t ) {
	var erlang;

	t.strictEqual( hasOwnProp( Erlang.prototype, 'mean' ), true, 'has property' );

	erlang = new Erlang( 2.0, 2.0 );
	t.strictEqual( erlang.mean, mean( 2.0, 2.0 ), 'returns expected value' );

	t.end();
});

tape( 'the distribution prototype has a property for retrieving the distribution mode', function test( t ) {
	var erlang;

	t.strictEqual( hasOwnProp( Erlang.prototype, 'mode' ), true, 'has property' );

	erlang = new Erlang( 2, 3.0 );
	t.strictEqual( erlang.mode, mode( 2, 3.0 ), 'returns expected value' );

	t.end();
});

tape( 'the distribution prototype has a property for retrieving the distribution skewness', function test( t ) {
	var erlang;

	t.strictEqual( hasOwnProp( Erlang.prototype, 'skewness' ), true, 'has property' );

	erlang = new Erlang( 2, 3.2 );
	t.strictEqual( erlang.skewness, skewness( 2, 3.2 ), 'returns expected value' );

	t.end();
});

tape( 'the distribution prototype has a property for retrieving the distribution standard deviation', function test( t ) {
	var erlang;

	t.strictEqual( hasOwnProp( Erlang.prototype, 'stdev' ), true, 'has property' );

	erlang = new Erlang( 3, 5.0 );
	t.strictEqual( erlang.stdev, stdev( 3, 5.0 ), 'returns expected value' );

	t.end();
});

tape( 'the distribution prototype has a property for retrieving the distribution variance', function test( t ) {
	var erlang;

	t.strictEqual( hasOwnProp( Erlang.prototype, 'variance' ), true, 'has property' );

	erlang = new Erlang( 3, 5.0 );
	t.strictEqual( erlang.variance, variance( 3, 5.0 ), 'returns expected value' );

	t.end();
});

tape( 'the distribution prototype has a method for evaluating the cumulative distribution function (CDF)', function test( t ) {
	var erlang;
	var y;

	t.strictEqual( hasOwnProp( Erlang.prototype, 'cdf' ), true, 'has property' );
	t.strictEqual( isFunction( Erlang.prototype.cdf ), true, 'has method' );

	erlang = new Erlang();
	y = erlang.cdf( 0.5 );

	t.strictEqual( y, cdf( 0.5, 1, 1.0 ), 'returns expected value' );
	t.end();
});

tape( 'the distribution prototype has a method for evaluating the natural logarithm of the probability density function (PDF)', function test( t ) {
	var erlang;
	var y;

	t.strictEqual( hasOwnProp( Erlang.prototype, 'logpdf' ), true, 'has property' );
	t.strictEqual( isFunction( Erlang.prototype.logpdf ), true, 'has method' );

	erlang = new Erlang();
	y = erlang.logpdf( 0.2 );

	t.strictEqual( y, logpdf( 0.2, 1, 1.0 ), 'returns expected value' );
	t.end();
});

tape( 'the distribution prototype has a method for evaluating the moment-generating function (MGF)', function test( t ) {
	var erlang;
	var y;

	t.strictEqual( hasOwnProp( Erlang.prototype, 'mgf' ), true, 'has property' );
	t.strictEqual( isFunction( Erlang.prototype.mgf ), true, 'has method' );

	erlang = new Erlang();
	y = erlang.mgf( 0.5 );

	t.strictEqual( y, mgf( 0.5, 1, 1.0 ), 'returns expected value' );
	t.end();
});

tape( 'the distribution prototype has a method for evaluating the probability density function (PDF)', function test( t ) {
	var erlang;
	var y;

	t.strictEqual( hasOwnProp( Erlang.prototype, 'pdf' ), true, 'has property' );
	t.strictEqual( isFunction( Erlang.prototype.pdf ), true, 'has method' );

	erlang = new Erlang();
	y = erlang.pdf( 0.2 );

	t.strictEqual( y, pdf( 0.2, 1, 1.0 ), 'returns expected value' );
	t.end();
});

tape( 'the distribution prototype has a method for evaluating the quantile function', function test( t ) {
	var erlang;
	var y;

	t.strictEqual( hasOwnProp( Erlang.prototype, 'quantile' ), true, 'has property' );
	t.strictEqual( isFunction( Erlang.prototype.quantile ), true, 'has method' );

	erlang = new Erlang();
	y = erlang.quantile( 0.8 );

	t.strictEqual( y, quantile( 0.8, 1, 1.0 ), 'returns expected value' );
	t.end();
});
