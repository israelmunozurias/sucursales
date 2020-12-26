<?php











namespace Composer;

use Composer\Semver\VersionParser;






class InstalledVersions
{
private static $installed = array (
  'root' => 
  array (
    'pretty_version' => '1.0.0+no-version-set',
    'version' => '1.0.0.0',
    'aliases' => 
    array (
    ),
    'reference' => NULL,
    'name' => '__root__',
  ),
  'versions' => 
  array (
    '__root__' => 
    array (
      'pretty_version' => '1.0.0+no-version-set',
      'version' => '1.0.0.0',
      'aliases' => 
      array (
      ),
      'reference' => NULL,
    ),
    'danielstjules/stringy' => 
    array (
      'pretty_version' => '1.10.0',
      'version' => '1.10.0.0',
      'aliases' => 
      array (
      ),
      'reference' => '4749c205db47ee5b32e8d1adf6d9aff8db6caf3b',
    ),
    'doctrine/inflector' => 
    array (
      'pretty_version' => 'v1.1.0',
      'version' => '1.1.0.0',
      'aliases' => 
      array (
      ),
      'reference' => '90b2128806bfde671b6952ab8bea493942c1fdae',
    ),
    'illuminate/container' => 
    array (
      'pretty_version' => 'v5.0.33',
      'version' => '5.0.33.0',
      'aliases' => 
      array (
      ),
      'reference' => 'aa85c752eb7c6ccc2c6ffc5bfffb3ba8dd9719d6',
    ),
    'illuminate/contracts' => 
    array (
      'pretty_version' => 'v5.0.33',
      'version' => '5.0.33.0',
      'aliases' => 
      array (
      ),
      'reference' => 'b8b11d78724a6f8a62be3b1dfa20fa372f861398',
    ),
    'illuminate/database' => 
    array (
      'pretty_version' => 'v5.0.4',
      'version' => '5.0.4.0',
      'aliases' => 
      array (
      ),
      'reference' => '1f83a771a2e3e1c5fa34b9e543229f506caa9aa2',
    ),
    'illuminate/support' => 
    array (
      'pretty_version' => 'v5.0.33',
      'version' => '5.0.33.0',
      'aliases' => 
      array (
      ),
      'reference' => '32a12f97029b624fc0f9454e7ca69eaafef49c5d',
    ),
    'kylekatarnls/update-helper' => 
    array (
      'pretty_version' => '1.2.1',
      'version' => '1.2.1.0',
      'aliases' => 
      array (
      ),
      'reference' => '429be50660ed8a196e0798e5939760f168ec8ce9',
    ),
    'nesbot/carbon' => 
    array (
      'pretty_version' => '1.39.1',
      'version' => '1.39.1.0',
      'aliases' => 
      array (
      ),
      'reference' => '4be0c005164249208ce1b5ca633cd57bdd42ff33',
    ),
    'symfony/polyfill-mbstring' => 
    array (
      'pretty_version' => 'v1.19.0',
      'version' => '1.19.0.0',
      'aliases' => 
      array (
      ),
      'reference' => 'b5f7b932ee6fa802fc792eabd77c4c88084517ce',
    ),
    'symfony/translation' => 
    array (
      'pretty_version' => 'v3.4.47',
      'version' => '3.4.47.0',
      'aliases' => 
      array (
      ),
      'reference' => 'be83ee6c065cb32becdb306ba61160d598b1ce88',
    ),
  ),
);







public static function getInstalledPackages()
{
return array_keys(self::$installed['versions']);
}









public static function isInstalled($packageName)
{
return isset(self::$installed['versions'][$packageName]);
}














public static function satisfies(VersionParser $parser, $packageName, $constraint)
{
$constraint = $parser->parseConstraints($constraint);
$provided = $parser->parseConstraints(self::getVersionRanges($packageName));

return $provided->matches($constraint);
}










public static function getVersionRanges($packageName)
{
if (!isset(self::$installed['versions'][$packageName])) {
throw new \OutOfBoundsException('Package "' . $packageName . '" is not installed');
}

$ranges = array();
if (isset(self::$installed['versions'][$packageName]['pretty_version'])) {
$ranges[] = self::$installed['versions'][$packageName]['pretty_version'];
}
if (array_key_exists('aliases', self::$installed['versions'][$packageName])) {
$ranges = array_merge($ranges, self::$installed['versions'][$packageName]['aliases']);
}
if (array_key_exists('replaced', self::$installed['versions'][$packageName])) {
$ranges = array_merge($ranges, self::$installed['versions'][$packageName]['replaced']);
}
if (array_key_exists('provided', self::$installed['versions'][$packageName])) {
$ranges = array_merge($ranges, self::$installed['versions'][$packageName]['provided']);
}

return implode(' || ', $ranges);
}





public static function getVersion($packageName)
{
if (!isset(self::$installed['versions'][$packageName])) {
throw new \OutOfBoundsException('Package "' . $packageName . '" is not installed');
}

if (!isset(self::$installed['versions'][$packageName]['version'])) {
return null;
}

return self::$installed['versions'][$packageName]['version'];
}





public static function getPrettyVersion($packageName)
{
if (!isset(self::$installed['versions'][$packageName])) {
throw new \OutOfBoundsException('Package "' . $packageName . '" is not installed');
}

if (!isset(self::$installed['versions'][$packageName]['pretty_version'])) {
return null;
}

return self::$installed['versions'][$packageName]['pretty_version'];
}





public static function getReference($packageName)
{
if (!isset(self::$installed['versions'][$packageName])) {
throw new \OutOfBoundsException('Package "' . $packageName . '" is not installed');
}

if (!isset(self::$installed['versions'][$packageName]['reference'])) {
return null;
}

return self::$installed['versions'][$packageName]['reference'];
}





public static function getRootPackage()
{
return self::$installed['root'];
}







public static function getRawData()
{
return self::$installed;
}



















public static function reload($data)
{
self::$installed = $data;
}
}
