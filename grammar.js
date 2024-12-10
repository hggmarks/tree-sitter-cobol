/**
 * @file A cobol parser to llvm
 * @author Hugo Felix <hggmarks@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "cobol",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => repeat(
      choice(
        $.program_definition,
    ),

    program_definition: $ => prec.right(seq(
      $.identification_division,
      optional($.environment_division),
      optional($.data_division),
      optional($.procedure_division),
      repeat($.end_program),
    )),

    identification_division: $ => seq(
      $._IDENTIFICATION, $._DIVISION, '.',
      // todo
    ),

    environment_division: $ => seq(
      $._ENVIRONMENT, $._DIVISION, '.',
      // todo
    ),

    data_division: $ => seq(
      $._DATA, $._DIVISION, '.',
      // todo
    ),

    procedure_division: $ => seq(
      $._PROCEDURE, $._DIVISION,
      //optional($.procedure_using_chaining),
      //optional($.procedure_returning),
      '.',
    ),

    end_program: $ => prec(1, seq(
      $._END_PROGRAM, $.program_name, '.',
    )),

    program_name: $ => choice(
      $._WORD,
      $._LITERAL
    ),

    _LITERAL: $ => choice(
      $.number,
      $._string,
    ),

    number: $ => choice($.integer, $.decimal),
    integer: $ => /[+-]?[0-9,]+/,
    decimal: $ => /[+-]?[0-9]*\.[0-9]+/,
    _string: $ => choice(
      $.string,
      $.x_string,
      $.z_string,
      $.dbcs_string,
      $.u_string,
      $.ux_string,
      $.n_string,
      $.nx_string,
     // $.h_string
    ),

    string: $ => choice(
      /('([^'\n]|'')*')+/,
      /("([^"\n]|"")*")+/,
    ),

    x_string: $ => choice(
      /X('([^'\n]|'')*')+/,
      /X("([^"\n]|"")*")+/,
    ),

    z_string: $ => choice(
      /Z('([^'\n]|'')*')+/,
      /Z("([^"\n]|"")*")+/,
    ),
    
    dbcs_literal: $ => choice(
      /G('<([^'\n]|'')*>')+/,
      /G("<([^"\n]|"")*>")+/,
      /N('<([^'\n]|'')*>')+/,
      /N("<([^"\n]|"")*>")+/,
    ),

    u_string: $ => choice(
      /U('([^'\n]|'')*')+/,
      /U("([^"\n]|"")*")+/,
    ),

    ux_string: $ => choice(
      /UX('([^'\n]|'')*')+/,
      /UX("([^"\n]|"")*")+/,
    ),

    n_string: $ => choice(
      /N('([^'\n]|'')*')+/,
      /N("([^"\n]|"")*")+/,
    ),

    nx_string: $ => choice(
      /NX('([^'\n]|'')*')+/,
      /NX("([^"\n]|"")*")+/,
    ),

    _IDENTIFICATION: $ => /[iI][dD][eE][nN][tT][iI][fF][iI][cC][aA][tT][iI][oO][nN]/,
    _ENVIRONMENT: $ => /[eE][nN][vV][iI][rR][oO][nN][mM][eE][nN][tT]/,
    _DATA: $ => /[dD][aA][tT][aA]/,
    _PROCEDURE: $ => /[pP][rR][oO][cC][eE][dD][uU][rR][eE]/,
    _DIVISION: $ => /[dD][iI][vV][iI][sS][iI][oO][nN]/,
    _WORD: $ => /([0-9][a-zA-Z0-9-]*[a-zA-Z][a-zA-Z0-9-]*)|([a-zA-Z][a-zA-Z0-9-]*)/,
    _END_PROGRAM: $ => /[eE][nN][dD][ \t]+[pP][rR][oO][gG][rR][aA][mM]/,
  }
});

