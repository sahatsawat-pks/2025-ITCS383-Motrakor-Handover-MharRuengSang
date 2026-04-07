/**
 * setup.js — runs before each test FILE (via setupFilesAfterEnv).
 *
 * NOTE: globalSetup.js already seeds test@example.com, test2@example.com,
 *       and an approved game once before the entire test run.
 *       This file intentionally does NOT call pool.end() — each pg Pool
 *       is kept alive for the lifetime of the worker process and Jest's
 *       --forceExit flag ensures clean termination.
 */

// No-op: seeding is handled by globalSetup.js.
// If individual test suites need specific teardown they handle it themselves.